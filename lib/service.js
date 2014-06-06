import { Object as EmberObject, RSVP, isBlank, keys } from 'ember';

export default EmberObject.extend({

  /**
  Example value for `properties`:

    [{
      propertyName: 'firstName',
      propertyValue: 'value of firstName',
      validations: {
        presence: true,
        length: { minimum: 5 }
      }
    }]
  */
  validate: function(properties) {
    var self = this;

    var promises = properties.map(function(property) {
      var propertyName = property.propertyName;
      var validatorPromises = self._promisesForValidators(property);

      return promiseForField(property, validatorPromises);
    });

    return RSVP.allSettled(promises, `Validator: validate properties`);
  },


  /**
    Returns an array of promises for each validators found on the property.

    Example property used as argument:

      {
        propertyName: 'firstName',
        propertyValue: 'value of firstName',
        validations: {
          presence: true,
          length: { minimum: 5 }
        }
      }

    `_promisesForValidators` iterates over all the keys found on the
    `validations` hash, looking up the validator for a given key.

    Each validator is called (they all return a promise object), from which an
    array of promises is returned.
  */
  _promisesForValidators: function(property) {
    var name = property.propertyName;
    var value = property.propertyValue;
    var validations = keys(property.validations);
    var self = this;

    return validations.map(function(type) {
      var validator = self.validatorFor(type);
      var options = property.validations[type];

      console.info(`Running ${type} validation on ${name}`);

      if (validator) {
        return validator.call(value, options);
      }

      console.warn(`No validator found for: ${type}`);
      return RSVP.resolve();
    });
  },


  /**
    Looks up and returns the validator for `name` found on the container.
  */
  validatorFor: function(name) {
    return this.container.lookup(`validator:${name}`);
  }
});


/**
  Returns a single promise reduced from the array of validator promises.

  Waits for all these promises to resolve, then:
    a) resolves or with an object that contains the name of the field (`propertyName`)
    b) rejects with the same object, plus the `errors` array if the errors array
       is not empty.
*/
function promiseForField(property, validatorPromises) {
  var propertyName = property.propertyName;

  return new RSVP.Promise(function(resolve, reject) {
    var debugInfo = `Validator: waiting for validators to finish for property: ${propertyName}`;

    RSVP.allSettled(validatorPromises, debugInfo).then(function(validatorResults) {
      var errors = errorsFromValidationResults(validatorResults);

      var retValue = {
        propertyName: propertyName
      }

      if (isBlank(errors)) {
        resolve(retValue);
      } else {
        retValue.errors = errors;
        reject(retValue);
      }
    });
  }, `Validator: validate property: ${propertyName}`);
}


/**
  Returns

  Waits for all these promises to resolve, then resolves with the array of
  errors for the field that came back from the rejected promises.
*/
function errorsFromValidationResults(results) {
  return results.filter(function(entry) {
    if (entry.state === 'rejected') {
      return true;
    }
  }).map(function(entry) {
    return entry.reason;
  });
}
