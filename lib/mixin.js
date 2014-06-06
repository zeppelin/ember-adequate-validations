import { Mixin, get, set, keys as objectKeys } from 'ember';

export default Mixin.create({
  errors: {},

  init: function() {
    this._super.apply(this, arguments);

    var self = this;
    var validations = this.validations;
    var propertiesToValidate = objectKeys(validations);

    // `actions` hash might not be present on the controller.
    this._actions = this._actions || {};
    this._actions.validate = this.validate;

    // Generate an action for each property (eg. `validateFirstName` for `firstName`)
    propertiesToValidate.forEach(function(propertyName) {
      var actionName = 'validate'+propertyName.capitalize();

      self._actions[actionName] = generateValidateFieldAction(propertyName);
    });
  },

  validate: function(propertyNames) {
    var self = this;
    var validations = this.validations;

    // Collect all property names that are on the `validations` hash
    propertyNames = propertyNames || objectKeys(validations);


    // Turn them into a specific format, as we'll need to
    //    1. validate the property's value
    //    2. reference back to the property name
    var fields = propertyNames.map(function(propertyName) {
      return {
        propertyName: propertyName,
        propertyValue: get(self, propertyName),
        validations: validations[propertyName]
      };
    });

    // Pass them to the validator's `validate` function, it returns a promise
    // which will always be resolved. See `RSVP.allSettled`.
    return this.validator.validate(fields).then(function(entries) {
      var errors = self.errors;

      entries.forEach(function(entry) {
        var state = entry.state;

        // Clear the error for the property name if the entry is fulfilled
        if (state === 'fulfilled') {
          set(errors, entry.value.propertyName, null);
          return;
        }

        // Set the error for that property name if not
        var reason = entry.reason;
        set(errors, reason.propertyName, reason.errors);
      });
    });
  }
});

/**
  Returns a function that validates the property passed when creating the function
*/
function generateValidateFieldAction(property) {
  return function() {
    return this.validate([property]);
  };
}
