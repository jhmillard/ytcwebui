'use strict';

describe('Controller: SowCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var SowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SowCtrl = $controller('SowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
