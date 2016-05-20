'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClientDtlCtrl = (function () {
  function ClientDtlCtrl($stateParams, $scope, $state, Client, User) {
    var _this = this;

    _classCallCheck(this, ClientDtlCtrl);

    $scope.text = "Hello";
    $scope.clientStateId = $stateParams.clientid;
    this.$state = $state;
    this.Client = Client;

    this.contacts = User.query();; //this is for the contact list

    //States
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' + 'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' + 'WY').split(' ').map(function (state) {
      return { abbrev: state };
    });

    if ($stateParams.clientid == 0) {
      this.currentclient = {};
      this.submit = "Add";
    } else {
      this.currentclient = Client.get({ id: $stateParams.clientid }, function () {
        _this.submit = "Update";
      });
    }
  }

  _createClass(ClientDtlCtrl, [{
    key: 'cancel',
    value: function cancel(previous) {
      if (previous) {
        this.$state.go(previous);
      } else {
        this.$state.go('main');
      }
    }
  }, {
    key: 'register',
    value: function register(form) {
      var _this2 = this;

      this.submitted = true;
      if (form.$valid) {
        if (this.submit == "Update") {
          this.Client.update(this.currentclient, function () {
            _this2.$state.go('client');
          });
        } else {
          this.Client.save(this.currentclient, function () {
            _this2.$state.go('client');
          });
        }
      }
    }
  }]);

  return ClientDtlCtrl;
})();

angular.module('ytcwebUirouteApp').controller('ClientDtlCtrl', ClientDtlCtrl);
//# sourceMappingURL=clientdtl.controller.js.map
