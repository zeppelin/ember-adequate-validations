import Service from './service';
import Mixin from './mixin';
import { Application, keys } from 'ember';
module validators from './validators';

Application.initializer({
  name: 'validations',
  initialize: function(container, application) {

    // Register built-in validators
    keys(validators).forEach(function(className) {
      var name = className.toLowerCase();
      container.register(`validator:${name}`, validators[className]);
    });

    // Register & inject validator service into controllers
    container.register('service:validation', Service);
    application.inject('controller', 'validator', 'service:validation');
  }
});

var Validators = validators;

export {
  Mixin,
  Service,
  Validators
};
