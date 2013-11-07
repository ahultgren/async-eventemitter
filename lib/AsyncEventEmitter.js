'use strict';

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    AsyncEventEmitter;


module.exports = exports = AsyncEventEmitter = function AsyncEventEmitter () {
  EventEmitter.call(this);
};

util.inherits(AsyncEventEmitter, EventEmitter);


/* Public methods
============================================================================= */
