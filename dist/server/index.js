'use strict';

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (env === 'development' || env === 'test' || env === 'production') {
  // Register the Babel require hook
  require('babel-core/register');
}

require('./components/intervals/interval');

// Export the application
exports = module.exports = require('./app');
//# sourceMappingURL=index.js.map
