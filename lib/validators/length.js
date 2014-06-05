import BaseValidator from './base';
import { RSVP, isBlank } from 'ember';

export default BaseValidator.extend({
  call: function(value, options) {
    /*

    Options can be the following:

    - number - Alias for is
    - array - Will expand to minimum and maximum. First element is the lower bound, second element is the upper bound.
    - allowBlank - If true skips validation if value is empty
    - minimum - The minimum length of the value allowed
    - maximum - The maximum length of the value allowed
    - is - The exact length of the value allowed
    - tokenizer - A function that should return a object that responds to length
    */

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
