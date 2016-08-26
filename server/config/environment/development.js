'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost/ytcwebuiroute-dev'
    uri: 'mongodb://admin:$admin@ds017256.mlab.com:17256/ytcweb'
  },

  // Seed database on startup
  seedDB: true

};
