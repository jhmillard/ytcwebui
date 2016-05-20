'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PoCtrlA = (function () {
  function PoCtrlA(Auth, Po, User, UserRole, $scope, $mdEditDialog) {
    var _this = this;

    _classCallCheck(this, PoCtrlA);

    this.Auth = Auth;
    this.UserRole = UserRole;
    this.Po = Po;
    this.mdeditDialog = $mdEditDialog;

    this.pos = Po.query(function () {

      PoCtrl;

      angular.forEach(_this.pos, function (value, key) {

        if (value.client) {
          var currentClient = User.get({ id: value.client });
          _this.pos[key].extendedclient = currentClient;
        }
      });
    });

    this.currentContractors = UserRole.query({ role: 'contractor' }, function () {
      _this.currentClients = UserRole.query({ role: 'client' });
    });

    $scope.selected = [];

    $scope.query = {
      order: 'poid',
      limit: 5,
      page: 1
    };
  }

  _createClass(PoCtrlA, [{
    key: 'delete',
    value: function _delete(po) {
      po.$remove();
      this.pos.splice(this.pos.indexOf(po), 1);
    }

    //Edit comment for list view comment updates.
  }, {
    key: 'editComment',
    value: function editComment(event, po, idx) {
      var _this2 = this;

      event.stopPropagation(); // in case autoselect is enabled
      var editDialog = {
        modelValue: po.info,
        placeholder: 'Status',
        targetEvent: event,
        save: function save(success) {
          po.info = success.$modelValue;
          _this2.Po.update(po).$promise;
          _this2.pos[idx] = po;
        },
        title: 'Status',
        validators: {
          'md-maxlength': 100
        }
      };

      var promise;
      promise = this.mdeditDialog.large(editDialog);
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    }
  }, {
    key: 'updatePo',
    value: function updatePo(p) {
      this.Po.update(p).$promise;
    }
  }]);

  return PoCtrlA;
})();

angular.module('ytcwebUirouteApp').controller('PoCtrlA', PoCtrlA);
//# sourceMappingURL=po.controller.js.map
