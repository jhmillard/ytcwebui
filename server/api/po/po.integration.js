'use strict';

var app = require('../..');
import request from 'supertest';

var newPo;

describe('Po API:', function() {

  describe('GET /api/pos', function() {
    var pos;

    beforeEach(function(done) {
      request(app)
        .get('/api/pos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/pos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pos')
        .send({
          name: 'New Po',
          info: 'This is the brand new po!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPo = res.body;
          done();
        });
    });

    it('should respond with the newly created po', function() {
      newPo.name.should.equal('New Po');
      newPo.info.should.equal('This is the brand new po!!!');
    });

  });

  describe('GET /api/pos/:id', function() {
    var po;

    beforeEach(function(done) {
      request(app)
        .get('/api/pos/' + newPo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          po = res.body;
          done();
        });
    });

    afterEach(function() {
      po = {};
    });

    it('should respond with the requested po', function() {
      po.name.should.equal('New Po');
      po.info.should.equal('This is the brand new po!!!');
    });

  });

  describe('PUT /api/pos/:id', function() {
    var updatedPo;

    beforeEach(function(done) {
      request(app)
        .put('/api/pos/' + newPo._id)
        .send({
          name: 'Updated Po',
          info: 'This is the updated po!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPo = {};
    });

    it('should respond with the updated po', function() {
      updatedPo.name.should.equal('Updated Po');
      updatedPo.info.should.equal('This is the updated po!!!');
    });

  });

  describe('DELETE /api/pos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/pos/' + newPo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when po does not exist', function(done) {
      request(app)
        .delete('/api/pos/' + newPo._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
