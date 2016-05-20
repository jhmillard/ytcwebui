'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LoginControllerTP = (function () {
  function LoginControllerTP(Auth, $state, User) {
    _classCallCheck(this, LoginControllerTP);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.showHints = true;
    this.userObj = User;

    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isAdmin = Auth.isAdmin;
    this.isContractor = Auth.isContractor;
  }

  _createClass(LoginControllerTP, [{
    key: 'login',
    value: function login(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Logged in, redirect to home

          //grab the user
          _this.userinfo = _this.userObj.get({ id: _this.Auth.getCurrentUser()._id }, function () {
            if (_this.userinfo.role == 'admin') {
              _this.$state.go('admindash');
            } else if (_this.userinfo.role == 'client') {
              _this.$state.go('clientdash');
            } else if (_this.userinfo.role == 'contractor') {
              _this.$state.go('contractordash');
            } else {
              _this.$state.go('main');
            }
          });
        })['catch'](function (err) {
          _this.errors.other = err.message;
        });
      }
    }
  }]);

  return LoginControllerTP;
})();

angular.module('ytcwebUirouteApp').controller('LoginControllerTP', LoginControllerTP);
//# sourceMappingURL=login.controller.tp.js.map
