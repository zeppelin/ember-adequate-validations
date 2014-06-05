import BaseValidator from './base';
import { RSVP } from 'ember';

export default BaseValidator.extend({
  call: function(value) {
    if (isNaN(value)) {
      return RSVP.reject('is not a number');
    } else {
      return RSVP.resolve();
    }
  }
});
