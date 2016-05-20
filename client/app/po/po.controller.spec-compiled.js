'use strict';

describe('Controller: PoCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var PoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PoCtrl = $controller('PoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

//# sourceMappingURL=po.controller.spec-compiled.js.map