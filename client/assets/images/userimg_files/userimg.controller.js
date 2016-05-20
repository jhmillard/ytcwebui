'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UserImgCtrl = (function () {
  function UserImgCtrl(Auth, $scope, User, $stateParams) {
    _classCallCheck(this, UserImgCtrl);

    this.User = User;
    this.currentUser = this.User.get({ id: $stateParams.userid }, function () {});
  }

  _createClass(UserImgCtrl, [{
    key: 'update',
    value: function update(previouspage) {
      this.User.update(this.currentUser, function () {
        window.history.back();
      });
    }
  }]);

  return UserImgCtrl;
})();

;

angular.module('ytcwebUirouteApp').controller('UserImgCtrl', UserImgCtrl);
//# sourceMappingURL=userimg.controller.js.map
