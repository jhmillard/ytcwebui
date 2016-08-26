/**
 * Invoice model events
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _events = require('events');

var Invoice = require('./invoice.model');
var InvoiceEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
InvoiceEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Invoice.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    InvoiceEvents.emit(event + ':' + doc._id, doc);
    InvoiceEvents.emit(event, doc);
  };
}

exports['default'] = InvoiceEvents;
module.exports = exports['default'];
//# sourceMappingURL=invoice.events.js.map
