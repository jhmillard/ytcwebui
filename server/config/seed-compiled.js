/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Po from '../api/po/po.model';

Thing.find({}).removeAsync().then(() => {
  Thing.create({
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

User.find({}).removeAsync().then(() => {
  User.createAsync({
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
  }).then(() => {
    console.log('finished populating users');
  });
});

Po.find({}).removeAsync().then(() => {
  Po.createAsync({
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
  }).then(() => {
    console.log('finished populating POs');
  });
});

//# sourceMappingURL=seed-compiled.js.map