/**
 * Main application routes
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _componentsErrors = require('./components/errors');

var _componentsErrors2 = _interopRequireDefault(_componentsErrors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function (app) {
  // Insert routes below
  app.use('/y', require('./api/daily'));
  app.use('/api/clients', require('./api/client'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/invoices', require('./api/invoice'));
  app.use('/api/pos', require('./api/po'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  //app.use('/intervals', require('./components/intervals'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_componentsErrors2['default'][404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2['default'].resolve(app.get('appPath') + '/index.html'));
  });
};

module.exports = exports['default'];
//# sourceMappingURL=routes.js.map
