
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContractordashCtrl = (function () {
  function ContractordashCtrl(Auth, PoContractor, User, $filter, Invoice) {
    var _this = this;

    _classCallCheck(this, ContractordashCtrl);

    this.clientPos = [];
    this.contractorClients = [];
    this.contractorInvoices = [];
    this.filter = "";
    this.client = {};
    this.filter = $filter;
    this.currentClient = {};
    this.all_purchase_orders = true;
    this.filtered_purchase_orders = false;

    this.inList = false;
    this.currentUser = Auth.getCurrentUser();

    //$scope.gradeC = $filter('filter')($scope.results.subjects, {grade: 'C'})[0];

    //this.userJSON = UserTimeSeriesChart.getChartData(this.currentUser);

    this.allInvoices = Invoice.query({}, function () {

      _this.contractorPos = PoContractor.get({ contractor: _this.currentUser._id }, function () {
        //need to get all of the users who's PO's are connected here...
        angular.forEach(_this.contractorPos, function (value, key) {

          var currentClient = User.get({ id: _this.contractorPos[key].client }, function () {
            angular.forEach(_this.contractorClients, function (cvalue, ckey) {
              if (_this.contractorClients[ckey]._id == currentClient._id) {
                _this.inList = true;
              }
            });

            if (_this.inList == false) {
              _this.contractorClients.push(currentClient);
            }
          });

          angular.forEach(_this.allInvoices, function (ivalue, ikey) {
            if (_this.allInvoices[ikey].po._id == _this.contractorPos[key]._id) {
              //total the timesheet data within the invoice
              var currentInvoice = _this.allInvoices[ikey];

              var total_hours = 0;
              var total_contractor_cost = 0;
              angular.forEach(currentInvoice.timesheets, function (tvalue, tkey) {
                total_hours += currentInvoice.timesheets[tkey].hours;
                total_contractor_cost += currentInvoice.timesheets[tkey].contractor_cost;
              });
              _this.allInvoices[ikey].total_hours = total_hours;
              _this.allInvoices[ikey].total_contractor_cost = total_contractor_cost;
              _this.contractorInvoices.push(_this.allInvoices[ikey]);
            }
          });
        });
      });
    });

    var all_client = {};
    all_client._id = 0;
    all_client.client_name = "All Clients";
    this.contractorClients.push(all_client);
  }

  _createClass(ContractordashCtrl, [{
    key: "setPoList",
    value: function setPoList() {
      //need to select PO's based on client AND current user...   or rather filter them based
      if (angular.isDefined(this.client._id)) {
        if (this.client._id == 0) {
          this.all_purchase_orders = true;
          this.filtered_purchase_orders = false;
        } else {
          this.all_purchase_orders = false;
          this.filtered_purchase_orders = true;
          this.filteredPos = this.filter('filter')(this.contractorPos, { client: this.client._id });
        }
      }
    }
  }]);

  return ContractordashCtrl;
})();

;

//if($filter('filter')(this.contractorClients,{_id:this.contractorPos[key].client}).length == 0){
//  this.currentClient = User.get({id: this.contractorPos[key].client},()=>{
//    this.contractorClients.push(this.currentClient);
//    this.currentClient = {};
//  })

angular.module('ytcwebUirouteApp').controller('ContractordashCtrl', ContractordashCtrl);
//# sourceMappingURL=contractordash.controller.js.map
