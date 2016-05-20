'use strict';

class PoCtrl {

  constructor(Auth, $state, Po, $scope) {
    this.Auth = Auth;
    this.$state = $state;
    this.pos = Po.query();

    $scope.myPOs = Po.query();
  }

}

angular.module('ytcwebUirouteApp').controller('PoCtrl', PoCtrl);

//# sourceMappingURL=po.controller-compiled.js.map