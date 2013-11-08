'use strict';

/*global it:true, describe:true*/
/*jshint unused:false*/
var should = require('should'),
    AsyncEventEmitter = require('../.'),
    events,
    i;

describe('An instance', function () {
  it('should be created', function () {
    events = new AsyncEventEmitter();
  });
});

describe('on()', function () {
  function listener1 (e, callback) {
    setTimeout(function () {
      i++;

      (typeof e).should.equal('object');
      (typeof callback).should.equal('function');

      callback();
    });
  }

  function listener2 (e, callback) {
    setTimeout(function () {
      i++;

      (typeof e).should.equal('object');
      (typeof callback).should.equal('function');

      callback();
    });
  }

  it('should register an eventlistener', function () {
    events.on('test1', listener1);
    events.on('test1', listener2);
    events._events.should.have.property('test1');
  });
});

describe('emit()', function () {
  it('should emit event and call callback after all eventlisteners are done', function (done) {
    i = 0;

    events.emit('test1', {}, function (err) {
      i.should.equal(2);
      done();
    });
  });
});
