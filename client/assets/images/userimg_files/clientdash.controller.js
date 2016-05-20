'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClientdashCtrl = function ClientdashCtrl(Auth, PoClient) {
  _classCallCheck(this, ClientdashCtrl);

  this.clientPos = [];

  this.currentUser = Auth.getCurrentUser();

  this.clientPos = PoClient.get({ client: this.currentUser._id }, function () {
    //need to get all of the users who's PO's are connected here...
    angular.forEach(this.clientPos, function (value, key) {

      //for each PO lets go ahead and select the unique

    });
  });
};

angular.module('ytcwebUirouteApp').controller('ClientdashCtrl', ClientdashCtrl);
//# sourceMappingURL=clientdash.controller.js.map
