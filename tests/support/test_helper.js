(function(host) {
  Ember.setupForTesting();

  host.App = Ember.Application.create();

  // Run before each test case.
  QUnit.testStart(function () {
    // Put the application into a known state, and destroy the defaultStore.
    // Be careful about DS.Model instances stored in App; they'll be invalid
    // after this.
    // This is broken in some versions of Ember and Ember Data, see:
    // https://github.com/emberjs/data/issues/847
    Ember.run(function () { App.reset(); });
    // Display an error if asynchronous operations are queued outside of
    // Ember.run.  You need this if you want to stay sane.
    Ember.testing = true;
  });

  // Run after each test case.
  QUnit.testDone(function () {
    Ember.testing = false;
  });

})(this);
