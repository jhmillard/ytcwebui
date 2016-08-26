'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newVendor;

describe('Vendor API:', function () {

  describe('GET /api/vendors', function () {
    var vendors;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/vendors').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        vendors = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      vendors.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/vendors', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/api/vendors').send({
        name: 'New Vendor',
        info: 'This is the brand new vendor!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newVendor = res.body;
        done();
      });
    });

    it('should respond with the newly created vendor', function () {
      newVendor.name.should.equal('New Vendor');
      newVendor.info.should.equal('This is the brand new vendor!!!');
    });
  });

  describe('GET /api/vendors/:id', function () {
    var vendor;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/vendors/' + newVendor._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        vendor = res.body;
        done();
      });
    });

    afterEach(function () {
      vendor = {};
    });

    it('should respond with the requested vendor', function () {
      vendor.name.should.equal('New Vendor');
      vendor.info.should.equal('This is the brand new vendor!!!');
    });
  });

  describe('PUT /api/vendors/:id', function () {
    var updatedVendor;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/api/vendors/' + newVendor._id).send({
        name: 'Updated Vendor',
        info: 'This is the updated vendor!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedVendor = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedVendor = {};
    });

    it('should respond with the updated vendor', function () {
      updatedVendor.name.should.equal('Updated Vendor');
      updatedVendor.info.should.equal('This is the updated vendor!!!');
    });
  });

  describe('DELETE /api/vendors/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/vendors/' + newVendor._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when vendor does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/vendors/' + newVendor._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});

//# sourceMappingURL=vendor.integration-compiled.js.map
//# sourceMappingURL=vendor.integration-compiled.js.map
