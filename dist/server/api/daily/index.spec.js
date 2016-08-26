'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dailyCtrlStub = {
  index: 'dailyCtrl.index',
  show: 'dailyCtrl.show',
  create: 'dailyCtrl.create',
  update: 'dailyCtrl.update',
  destroy: 'dailyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var dailyIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './daily.controller': dailyCtrlStub
});

describe('Daily API Router:', function () {

  it('should return an express router instance', function () {
    dailyIndex.should.equal(routerStub);
  });

  describe('GET /y', function () {

    it('should route to daily.controller.index', function () {
      routerStub.get.withArgs('/', 'dailyCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET /y/:id', function () {

    it('should route to daily.controller.show', function () {
      routerStub.get.withArgs('/:id', 'dailyCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /y', function () {

    it('should route to daily.controller.create', function () {
      routerStub.post.withArgs('/', 'dailyCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT /y/:id', function () {

    it('should route to daily.controller.update', function () {
      routerStub.put.withArgs('/:id', 'dailyCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH /y/:id', function () {

    it('should route to daily.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'dailyCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE /y/:id', function () {

    it('should route to daily.controller.destroy', function () {
      routerStub['delete'].withArgs('/:id', 'dailyCtrl.destroy').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
