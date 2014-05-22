var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var moduleFilter = require('broccoli-dist-es6-module');
var esNext = require('broccoli-esnext');

var env  = process.env.BROCCOLI_ENV || 'development';

var tree = esNext('lib');

tree = moduleFilter(tree, {
  global: 'Ember.AdequateValidations',
  packageName: 'ember-adequate-validations',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
});

if (env === 'development') {
  var vendor = pickFiles('bower_components', {
    srcDir: '/',
    destDir: 'vendor'
  });

  var lib = pickFiles(tree, {
    srcDir: '/',
    destDir: 'lib'
  });

  tree = mergeTrees(['public', vendor, lib]);
}

module.exports = tree;
