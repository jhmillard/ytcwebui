'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var app = require('../..');

var newDaily;

describe('Daily API:', function () {

  describe('GET /y', function () {
    var dailys;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/y').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        dailys = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      dailys.should.be.instanceOf(Array);
    });
  });

  describe('POST /y', function () {
    beforeEach(function (done) {
      (0, _supertest2['default'])(app).post('/y').send({
        name: 'New Daily',
        info: 'This is the brand new daily!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newDaily = res.body;
        done();
      });
    });

    it('should respond with the newly created daily', function () {
      newDaily.name.should.equal('New Daily');
      newDaily.info.should.equal('This is the brand new daily!!!');
    });
  });

  describe('GET /y/:id', function () {
    var daily;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).get('/y/' + newDaily._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        daily = res.body;
        done();
      });
    });

    afterEach(function () {
      daily = {};
    });

    it('should respond with the requested daily', function () {
      daily.name.should.equal('New Daily');
      daily.info.should.equal('This is the brand new daily!!!');
    });
  });

  describe('PUT /y/:id', function () {
    var updatedDaily;

    beforeEach(function (done) {
      (0, _supertest2['default'])(app).put('/y/' + newDaily._id).send({
        name: 'Updated Daily',
        info: 'This is the updated daily!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedDaily = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedDaily = {};
    });

    it('should respond with the updated daily', function () {
      updatedDaily.name.should.equal('Updated Daily');
      updatedDaily.info.should.equal('This is the updated daily!!!');
    });
  });

  describe('DELETE /y/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2['default'])(app)['delete']('/y/' + newDaily._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when daily does not exist', function (done) {
      (0, _supertest2['default'])(app)['delete']('/y/' + newDaily._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=daily.integration.js.map
