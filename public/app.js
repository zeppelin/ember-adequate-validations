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
