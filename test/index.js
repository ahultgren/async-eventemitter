'use strict';

/*global it:true, describe:true*/
var /*chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,*/
    AsyncEventEmitter = require('../.'),
    events;


describe('An instance', function () {
  it('should be created', function () {
    events = new AsyncEventEmitter();
  });
});
