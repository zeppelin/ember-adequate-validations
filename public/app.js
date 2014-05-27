var App = Ember.Application.create();

App.IndexController = Ember.Controller.extend(Ember.AdequateValidations.Mixin, {
  validations: {
    firstName: {
      presence: true,
      length: { minimum: 5 }
    },
    lastName: {
      presence: true
    },
    age: {
      numericality: true
    }
  }
});

App.LengthValidator = Ember.AdequateValidations.Validators.Base.extend({
  call: function() {
    return Ember.RSVP.reject('is not long enough');
  }
});

App.NumericalityValidator = Ember.AdequateValidations.Validators.Base.extend({
  call: function() {
    return Ember.RSVP.reject('is not a number');
  }
});
