/**
 * Po model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Po = require('./po.model');
var PoEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PoEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Po.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PoEvents.emit(event + ':' + doc._id, doc);
    PoEvents.emit(event, doc);
  };
}

exports['default'] = PoEvents;
module.exports = exports['default'];
//# sourceMappingURL=po.events.js.map
