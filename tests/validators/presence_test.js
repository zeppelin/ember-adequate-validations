var Controller;

module('Presence Validator', {
  setup: function() {
    console.log('Setup.');

    Controller = App.IndexController = Ember.Controller.extend(Ember.AdequateValidations.Mixin, {
      validations: {
        firstName: {
          presence: true
        }
      }
    });
  }
});

test('when value is empty', function(assert) {
  // TODO: WTF am I doing here?! Figure out how to test this...
  assert.wont(Controller.send('validateFirstName'));
});

test('when value is not empty', function(assert) {
  assert.ok(true);
});
