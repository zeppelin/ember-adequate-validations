import BaseValidator from './base';
import { RSVP, isBlank } from 'ember';

export default BaseValidator.extend({
  call: function(value) {
    if (isBlank(value)) {
      return RSVP.reject('is required');
    } else {
      return RSVP.resolve();
    }
  }
});
