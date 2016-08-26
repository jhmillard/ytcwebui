'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var poCtrlStub = {
  index: 'poCtrl.index',
  show: 'poCtrl.show',
  create: 'poCtrl.create',
  update: 'poCtrl.update',
  destroy: 'poCtrl.destroy',
  contractor: 'poCtrl.contractor',
  findstatus: 'poCtrl.findstatus'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var poIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './po.controller': poCtrlStub
});

describe('Po API Router:', function () {

  it('should return an express router instance', function () {
    poIndex.should.equal(routerStub);
  });

  describe('GET /api/pos', function () {

    it('should route to po.controller.index', function () {
      routerStub.get.withArgs('/', 'poCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET /api/pos/:id', function () {

    it('should route to po.controller.show', function () {
      routerStub.get.withArgs('/:id', 'poCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /api/pos', function () {

    it('should route to po.controller.create', function () {
      routerStub.post.withArgs('/', 'poCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT /api/pos/:id', function () {

    it('should route to po.controller.update', function () {
      routerStub.put.withArgs('/:id', 'poCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pos/:id', function () {

    it('should route to po.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'poCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pos/:id', function () {

    it('should route to po.controller.destroy', function () {
      routerStub['delete'].withArgs('/:id', 'poCtrl.destroy').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
