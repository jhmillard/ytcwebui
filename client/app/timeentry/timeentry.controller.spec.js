'use strict';

describe('Controller: TimeentryCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var TimeentryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimeentryCtrl = $controller('TimeentryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
