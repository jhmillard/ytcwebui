'use strict';


class ClientDtlCtrl{

  constructor($stateParams,$scope,$state,Client, User){
    $scope.text = "Hello";
    $scope.clientStateId = $stateParams.clientid;
    this.$state = $state;
    this.Client = Client;

    this.contacts = User.query();; //this is for the contact list

    //States
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
      return {abbrev: state};
    });


    if($stateParams.clientid==0){
      this.currentclient = {};
      this.submit = "Add";
    }
    else{
      this.currentclient = Client.get({id: $stateParams.clientid},()=>{
        this.submit="Update";
      });
    }
  }

  cancel(previous){
    if(previous){
      this.$state.go(previous)
    }
    else{
      this.$state.go('main');
    }

  };
  register(form) {
    this.submitted = true;
    if (form.$valid) {
      if(this.submit == "Update")
      {
        this.Client.update(this.currentclient,()=>{
          this.$state.go('client')
        });
      }else{
        this.Client.save(this.currentclient,()=>{
          this.$state.go('client');
        });
      }
    }
  };


}


angular.module('ytcwebUirouteApp')
  .controller('ClientDtlCtrl', ClientDtlCtrl);
