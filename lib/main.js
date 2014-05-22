import Service from './service';
import Mixin from './mixin';
import { Application } from 'ember';

Application.initializer({
  name: 'validations',
  initialize: function(container) {
    container.register('service:validation', Service);
  }
});

export {
  Mixin,
  Service
};
