/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var _apiPoPoModel = require('../api/po/po.model');

var _apiPoPoModel2 = _interopRequireDefault(_apiPoPoModel);

_apiThingThingModel2['default'].find({}).removeAsync().then(function () {
  _apiThingThingModel2['default'].create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_apiUserUserModel2['default'].find({}).removeAsync().then(function () {
  _apiUserUserModel2['default'].createAsync({
    provider: 'local',
    first_name: 'Test',
    last_name: 'Name',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    first_name: 'Admin',
    last_name: 'LastName',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});

_apiPoPoModel2['default'].find({}).removeAsync().then(function () {
  _apiPoPoModel2['default'].createAsync({
    poid: "PO1",
    podesc: "Test PO1",
    pohours: 100,
    poclient: "Client 1"
  }, {
    poid: "PO2",
    podesc: "Test PO2",
    pohours: 50,
    poclient: "Client 1"
  }, {
    poid: "PO3",
    podesc: "Test PO3",
    pohours: 80,
    poclient: "Client 3"
  }, {
    poid: "PO4",
    podesc: "Test PO4",
    pohours: 75,
    poclient: "Client 1"
  }).then(function () {
    console.log('finished populating POs');
  });
});

//# sourceMappingURL=seed-compiled.js.map
//# sourceMappingURL=seed-compiled.js.map
