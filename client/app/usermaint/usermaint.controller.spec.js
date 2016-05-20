'use strict';

describe('Controller: UsermaintCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var UsermaintCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsermaintCtrl = $controller('UsermaintCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
