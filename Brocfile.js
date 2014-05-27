var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var moduleFilter = require('broccoli-dist-es6-module');
var esNext = require('broccoli-esnext');
var es3SafeRecast = require('broccoli-es3-safe-recast');

var env  = process.env.BROCCOLI_ENV || 'development';

var tree, vendor, lib;

lib = 'lib';
lib = esNext(lib);
lib = moduleFilter(lib, {
  global: 'Ember.AdequateValidations',
  packageName: 'ember-adequate-validations',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
});
lib = es3SafeRecast(lib);


if (env !== 'development') {
  tree = lib;
} else {
  vendor = pickFiles('bower_components', {
    srcDir: '/',
    destDir: 'vendor'
  });

  lib = pickFiles(lib, {
    srcDir: '/',
    destDir: 'lib'
  });

  tree = mergeTrees(['public', vendor, lib]);
}

module.exports = tree;
