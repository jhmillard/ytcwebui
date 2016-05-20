'use strict';

class PoCtrlA{

  constructor(Auth, Po, User,UserRole, $scope, $mdEditDialog) {
    this.Auth = Auth;
    this.UserRole = UserRole;
    this.Po = Po;
    this.mdeditDialog = $mdEditDialog;

    this.pos = Po.query(()=>{

      angular.forEach(this.pos, (value,key) => {

        if(value.client){
          var currentClient = User.get({id: value.client});
          this.pos[key].extendedclient = currentClient;
        }
      });
    });

    this.currentContractors = UserRole.query({role:'contractor'},()=>{
      this.currentClients = UserRole.query({role:'client'});
    });



    $scope.selected = [];

    $scope.query = {
      order: 'poid',
      limit: 5,
      page: 1
    };
  }

  delete(po) {
    po.$remove();
    this.pos.splice(this.pos.indexOf(po), 1);
  }


  //Edit comment for list view comment updates.
  editComment(event,po,idx){
    event.stopPropagation(); // in case autoselect is enabled
    var editDialog = {
      modelValue: po.info,
      placeholder: 'Status',
      targetEvent: event,
      save: ( success => {
        po.info = success.$modelValue;
        this.Po.update(po).$promise
        this.pos[idx] = po;
      }),
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

  updatePo(p){
    this.Po.update(p).$promise;
  }

}



angular.module('ytcwebUirouteApp')
  .controller('PoCtrlA', PoCtrlA);
