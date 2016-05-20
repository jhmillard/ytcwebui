'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PoCtrl = function PoCtrl(Auth, $state, Po, $scope) {
  _classCallCheck(this, PoCtrl);

  this.Auth = Auth;
  this.$state = $state;
  this.pos = Po.query();

  $scope.myPOs = Po.query();
};

angular.module('ytcwebUirouteApp').controller('PoCtrl', PoCtrl);

//# sourceMappingURL=po.controller-compiled.js.map
//# sourceMappingURL=po.controller-compiled.js.map
