var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var moduleFilter = require('broccoli-dist-es6-module');
var esNext = require('broccoli-esnext');
var es3SafeRecast = require('broccoli-es3-safe-recast');

var env = process.env.BROCCOLI_ENV || 'development';

var tree, vendor, lib, tests;

/* Vendor */

vendor = pickFiles('bower_components', {
  srcDir: '/',
  destDir: 'vendor'
});

/* Lib */

lib = esNext('lib');
lib = moduleFilter(lib, {
  global: 'Ember.AdequateValidations',
  packageName: 'ember-adequate-validations',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
});
lib = es3SafeRecast(lib);
lib = pickFiles(lib, {
  srcDir: '/',
  destDir: 'lib'
});

/* Tests */

tests = pickFiles('tests', {
  srcDir: '/',
  destDir: 'tests'
});

switch(env) {
  case 'development':
    tree = mergeTrees(['public', vendor, lib]);
    break;
  case 'test':
    tree = mergeTrees(['public', vendor, lib, tests]);
    break;
  default:
    tree = lib;
}

module.exports = tree;
