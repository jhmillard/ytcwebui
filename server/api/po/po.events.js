/**
 * Po model events
 */

'use strict';

import {EventEmitter} from 'events';
var Po = require('./po.model');
var PoEvents = new EventEmitter();

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
  return function(doc) {
    PoEvents.emit(event + ':' + doc._id, doc);
    PoEvents.emit(event, doc);
  }
}

export default PoEvents;
