/**
 * Broadcast updates to client when the model changes
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.register = register;
var DailyEvents = require('./daily.events');

// Model events to emit
var events = ['save', 'remove'];

function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('daily:' + event, socket);

    DailyEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    DailyEvents.removeListener(event, listener);
  };
}
//# sourceMappingURL=daily.socket.js.map
