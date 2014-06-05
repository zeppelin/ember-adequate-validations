import BaseValidator from './base';
import { RSVP, isBlank } from 'ember';

export default BaseValidator.extend({
  call: function(value, options) {
    var errors = [];

    if (options.minimum && (value.length < options.minimum)) {
      errors.push('is too short');
    }

    if (options.maximum && (value.length > options.maximum)) {
      errors.push('is too long');
    }

    if (Ember.isBlank(errors)) {
      return RSVP.resolve();
    } else {
      return RSVP.reject(errors.join(', '));
    }
  }
});
