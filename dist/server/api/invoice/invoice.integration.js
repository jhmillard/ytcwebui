'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newInvoice;

describe('Invoice API:', function () {

  describe('GET /api/invoices', function () {
    var invoices;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/invoices').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        invoices = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      invoices.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/invoices', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/api/invoices').send({
        name: 'New Invoice',
        info: 'This is the brand new invoice!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newInvoice = res.body;
        done();
      });
    });

    it('should respond with the newly created invoice', function () {
      newInvoice.name.should.equal('New Invoice');
      newInvoice.info.should.equal('This is the brand new invoice!!!');
    });
  });

  describe('GET /api/invoices/:id', function () {
    var invoice;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/api/invoices/' + newInvoice._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        invoice = res.body;
        done();
      });
    });

    afterEach(function () {
      invoice = {};
    });

    it('should respond with the requested invoice', function () {
      invoice.name.should.equal('New Invoice');
      invoice.info.should.equal('This is the brand new invoice!!!');
    });
  });

  describe('PUT /api/invoices/:id', function () {
    var updatedInvoice;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/api/invoices/' + newInvoice._id).send({
        name: 'Updated Invoice',
        info: 'This is the updated invoice!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedInvoice = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedInvoice = {};
    });

    it('should respond with the updated invoice', function () {
      updatedInvoice.name.should.equal('Updated Invoice');
      updatedInvoice.info.should.equal('This is the updated invoice!!!');
    });
  });

  describe('DELETE /api/invoices/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/invoices/' + newInvoice._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when invoice does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/api/invoices/' + newInvoice._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=invoice.integration.js.map
