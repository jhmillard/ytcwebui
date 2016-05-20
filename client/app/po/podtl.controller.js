'use strict';

class PoDtlCtrl{

  constructor($stateParams, $scope, Po, User, UserRole, Client, $state, $rootScope) {
    $scope.current = "In Detail Controller";
    $scope.updateID = $stateParams.poid;
    this.Po = Po;
    this.$state = $state;
    $scope.showHints = true;
    //this.clients = Client.query();

    this.clients = UserRole.query({role:'client'},()=> {

      this.users = User.query();
      if($stateParams.poid==0){
        this.currentpo = {};
        this.submit = "Add";
      }
      else{
        this.currentpo = Po.get({id: $stateParams.poid},()=>{
          if(!this.currentpo.date){
            this.currentpo.date = new Date();
          }else{
            this.currentpo.date = new Date(this.currentpo.date);
          }

          this.submit="Update";
        });
      }

    });

    this.status = [{
      status: "open",
      desc: "Open"
    },
    {
      status: "closed",
      desc: "Closed"
    }];




    this.previousPage = $rootScope.previousPage;

  }

  cancel(){


    window.history.back();
    //if(this.previousPage){
    //  this.$state.go(previous)
    //}
    //else{
    //  this.$state.go('main');
    //}

  };



  register(form,previous) {
    this.submitted = true;


    if (form.$valid) {


      if(this.submit == "Update")
      {
        this.Po.update(this.currentpo);
        //this.$state.go('po');
        window.history.back();

      }else{
        this.Po.save(
            this.currentpo
          );
          //this.$state.go('po');
        window.history.back();

      }

    }
  }

}

angular.module('ytcwebUirouteApp')
  .controller('PoDtlCtrl', PoDtlCtrl);
