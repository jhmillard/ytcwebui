/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
  // Insert routes below
  app.use('/api/clients', require('./api/client'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/invoices', require('./api/invoice'));
  app.use('/api/pos', require('./api/po'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get((req, res) => {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
}

//# sourceMappingURL=routes-compiled.js.map