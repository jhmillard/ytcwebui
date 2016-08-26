/**
 * Client model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Client = require('./client.model');
var ClientEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ClientEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Client.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ClientEvents.emit(event + ':' + doc._id, doc);
    ClientEvents.emit(event, doc);
  };
}

exports['default'] = ClientEvents;

//# sourceMappingURL=client.events-compiled.js.map
module.exports = exports['default'];
//# sourceMappingURL=client.events-compiled.js.map
