/**
 * Daily model events
 */

'use strict';

import {EventEmitter} from 'events';
var Daily = require('./daily.model');
var DailyEvents = new EventEmitter();

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
  return function(doc) {
    DailyEvents.emit(event + ':' + doc._id, doc);
    DailyEvents.emit(event, doc);
  }
}

export default DailyEvents;
