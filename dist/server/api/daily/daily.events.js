/**
 * Daily model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Daily = require('./daily.model');
var DailyEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
DailyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Daily.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    DailyEvents.emit(event + ':' + doc._id, doc);
    DailyEvents.emit(event, doc);
  };
}

exports['default'] = DailyEvents;
module.exports = exports['default'];
//# sourceMappingURL=daily.events.js.map
