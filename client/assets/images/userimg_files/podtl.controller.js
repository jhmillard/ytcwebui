'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PoDtlCtrl = (function () {
  function PoDtlCtrl($stateParams, $scope, Po, User, UserRole, Client, $state, $rootScope) {
    var _this = this;

    _classCallCheck(this, PoDtlCtrl);

    $scope.current = "In Detail Controller";
    $scope.updateID = $stateParams.poid;
    this.Po = Po;
    this.$state = $state;
    $scope.showHints = true;
    //this.clients = Client.query();

    this.clients = UserRole.query({ role: 'client' }, function () {

      _this.users = User.query();
      if ($stateParams.poid == 0) {
        _this.currentpo = {};
        _this.submit = "Add";
      } else {
        _this.currentpo = Po.get({ id: $stateParams.poid }, function () {
          if (!_this.currentpo.date) {
            _this.currentpo.date = new Date();
          } else {
            _this.currentpo.date = new Date(_this.currentpo.date);
          }

          _this.submit = "Update";
        });
      }
    });

    this.previousPage = $rootScope.previousPage;
  }

  _createClass(PoDtlCtrl, [{
    key: 'cancel',
    value: function cancel() {

      window.history.back();
      //if(this.previousPage){
      //  this.$state.go(previous)
      //}
      //else{
      //  this.$state.go('main');
      //}
    }
  }, {
    key: 'register',
    value: function register(form, previous) {
      this.submitted = true;

      if (form.$valid) {

        if (this.submit == "Update") {
          this.Po.update(this.currentpo);
          //this.$state.go('po');
          window.history.back();
        } else {
          this.Po.save(this.currentpo);
          //this.$state.go('po');
          window.history.back();
        }
      }
    }
  }]);

  return PoDtlCtrl;
})();

angular.module('ytcwebUirouteApp').controller('PoDtlCtrl', PoDtlCtrl);
//# sourceMappingURL=podtl.controller.js.map
