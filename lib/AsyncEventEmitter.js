'use strict';

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    async = require('async'),
    AsyncEventEmitter;


module.exports = exports = AsyncEventEmitter = function AsyncEventEmitter () {
  EventEmitter.call(this);
};

util.inherits(AsyncEventEmitter, EventEmitter);


/* Public methods
============================================================================= */

AsyncEventEmitter.prototype.emit = function(event, data, callback) {
  var listeners = this._events[event];

  // Optional data argument
  if(!callback && typeof data === 'function') {
    callback = data;
    data = undefined;
  }

  // A single listener is just a function not an array...
  listeners = Array.isArray(listeners) ? listeners : [listeners];

  async.eachSeries(listeners, function (fn, next) {
    fn(data, next);
  }, callback);
};
