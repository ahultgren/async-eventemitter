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

  it('should emit with no argument', function (done) {
    events.on('no-arg', function (e, next) {
      (typeof e).should.equal('undefined');
      next();
      done();
    });

    events.emit('no-arg');
  });

  it('should emit with only data argument', function (done) {
    events.on('data-only', function (e, next) {
      e.should.equal(1);
      next();
      done();
    });

    events.emit('data-only', 1);
  });

  it('should emit with only callback argument', function (done) {
    events.on('function-only', function (e, next) {
      (typeof e).should.equal('undefined');
      next();
    });

    events.emit('function-only', done);
  });
});

describe('eventlisteners', function () {
  it('should be synchronous if no next-argument specified', function (done) {
    events.on('sync', function (e) {
      e.should.equal(1);
    });

    events.emit('sync', 1, done);
  });
});

describe('next(err)', function () {
  it('should abort the callback chain', function (done) {
    events.on('err', function (e, next) {
      next(1);
    });

    events.on('err', function (e, next) {
      throw('Expected this function to not be called');
    });

    events.emit('err', function (err) {
      err.should.equal(1);
      done();
    });
  });
});
