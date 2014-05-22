import Service from './service';
import Mixin from './mixin';
import { Application, keys } from 'ember';
module validators from './validators';

Application.initializer({
  name: 'validations',
  initialize: function(container, application) {

    // Register built-in validators
    keys(validators).forEach(function(className) {
      var name = className.replace(/Validator$/, '').toLowerCase();
      container.register(`validator:${name}`, validators[className]);
    });

    // TODO Register user-provided validators

    // Register & inject the validator service into the controllers
    container.register('service:validation', Service);
    application.inject('controller', 'validator', 'service:validation');
  }
});

export {
  Mixin,
  Service
};
