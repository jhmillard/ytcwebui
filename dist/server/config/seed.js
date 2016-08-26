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

var _apiClientClientModel = require('../api/client/client.model');

var _apiClientClientModel2 = _interopRequireDefault(_apiClientClientModel);

var _apiInvoiceInvoiceModel = require('../api/invoice/invoice.model');

var _apiInvoiceInvoiceModel2 = _interopRequireDefault(_apiInvoiceInvoiceModel);

_apiThingThingModel2['default'].find({}).removeAsync();

_apiInvoiceInvoiceModel2['default'].find({}).removeAsync().then(function () {
  console.log('finished deleting invoices');
});

_apiUserUserModel2['default'].find({}).removeAsync().then(function () {
  _apiUserUserModel2['default'].createAsync({
    provider: 'local',
    first_name: 'Test',
    last_name: 'Name',
    email: 'test@example.com',
    password: 'test',
    validated: true,
    role: 'admin',
    timesheets: [],
    img_url: "assets/images/frog_withshadow.jpg"
  }, {
    provider: 'local',
    first_name: 'John',
    last_name: 'Millard',
    email: 'john.millard@yellowtoadconsulting.com',
    password: '$ytc123',
    role: 'contractor',
    contractor_rate: 145.00,
    timesheets: [],
    img_url: "assets/images/ytc_president.jpg"
  }, {
    provider: 'local',
    first_name: 'Jim',
    last_name: 'Bob',
    email: 'test@test2.com',
    password: 'test',
    role: 'contractor',
    contractor_rate: 100.00,
    timesheets: []
  }, {
    provider: 'local',
    first_name: 'Captain',
    last_name: 'Crunch',
    email: 'test@test3.com',
    password: 'test',
    role: 'contractor',
    contractor_rate: 100.00,
    timesheets: []
  }, {
    provider: 'local',
    first_name: 'Jan',
    last_name: 'Name',
    email: 'client@client.com',
    password: 'client',
    role: 'client',
    client_rate: 100.00,
    client_name: 'Infor Global Solutions',
    timesheets: [],
    img_url: "assets/images/new_infor_logo.jpg"
  }, {
    provider: 'local',
    first_name: 'Diane',
    last_name: 'Hite',
    client_name: 'Ingram Micro',
    email: 'diane.hite@ingrammicro.com',
    password: 'br1ghtp01nt',
    role: 'client',
    client_rate: 145.00,
    timesheets: [],
    img_url: "assets/images/ingram_micro.jpeg"
  }).then(function () {
    console.log('finished populating users');
  });
});

_apiClientClientModel2['default'].find({}).removeAsync().then(function () {
  _apiClientClientModel2['default'].createAsync({
    name: "ClientA",
    info: "This is a test Client ONE",
    addr1: "1234 Street",
    addr2: "",
    city: "Caledonia",
    state: "MI",
    zip: "49316",
    rate: 100
  }, {
    name: "Client2",
    info: "This is a test Client TWO",
    addr1: "1234 Road",
    addr2: "PO 1234",
    city: "Alto",
    state: "MI",
    zip: "49302",
    rate: 125
  }).then(function () {
    console.log('finished populating Clients');
  });
});

_apiPoPoModel2['default'].find({}).removeAsync().then(function () {

  //var newUser = new User.createAsync({
  //   provider: 'local',
  //   first_name: 'Test',
  //   last_name: 'Name',
  //   email: 'test@example.com',
  //   password: 'test',
  //   role: 'admin',
  //   timesheets:[]
  // });
  //
  // newUser.save(function(err){
  //   if(err){
  //     return handleError(err)
  //   }
  // });
  _apiPoPoModel2['default'].createAsync({
    poid: "PO1",
    podesc: "Test PO1",
    hours: 100,
    project: "PRJ1001"
  }, {
    poid: "PO2",
    podesc: "Test PO2",
    hours: 50,
    project: "PRJ0345"

  }, {
    poid: "PO3",
    podesc: "Test PO3",
    hours: 100,
    project: "PRJ4568"
  }, {
    poid: "PO4",
    podesc: "Test PO4",
    hours: 25,
    project: "PRJ4567",
    status: "closed"
  }).then(function () {
    console.log('finished populating POs');
  });
});
//# sourceMappingURL=seed.js.map
