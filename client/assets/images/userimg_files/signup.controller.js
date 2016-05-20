'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SignupController = (function () {
  //end-non-standard

  function SignupController(Auth, $state, $scope, $rootScope) {
    _classCallCheck(this, SignupController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.displayClientInfo = false;

    $scope.showHints = true;

    $scope.types = [{
      type: 'client',
      desc: 'Client'
    }, {
      type: 'contractor',
      desc: 'Contractor'
    }, {
      type: 'admin',
      desc: 'Administrator'
    }, {
      type: 'contact',
      desc: 'Contact'
    }];

    $scope.previousPage = $rootScope.previousPage;
  }

  _createClass(SignupController, [{
    key: 'onrolechange',
    value: function onrolechange() {
      if (this.user.role == 'client') {
        this.displayClientInfo = true;
      } else {
        this.displayClientInfo = false;
      }
    }
  }, {
    key: 'register',
    value: function register(form, previous) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.createUser({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          role: this.user.role,
          email: this.user.email,
          password: this.user.password,
          phone: this.user.phone,
          client_name: this.user.client_name,
          client_addr1: this.user.client_addr1

        }).then(function () {
          // Account created, redirect to home
          _this.$state.go('admin');
          //this.$state.go('admin');
        })['catch'](function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            _this.errors[field] = error.message;
          });
        });
      }
    }
  }]);

  return SignupController;
})();

angular.module('ytcwebUirouteApp').controller('SignupController', SignupController);

//start-non-standard
//# sourceMappingURL=signup.controller.js.map
