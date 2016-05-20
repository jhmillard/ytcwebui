'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $scope, $rootScope) {
    this.Auth = Auth;
    this.$state = $state;
    this.displayClientInfo = false;

    $scope.showHints = true;

    $scope.types = [
      {
        type:'client',
        desc:'Client'
      },
      {
        type:'contractor',
        desc:'Contractor'
      },
      //{
      //  type:'admin',
      //  desc:'Administrator'
      //},
      {
        type:'contact',
        desc:'Contact'
      }
     ];

    $scope.previousPage = $rootScope.previousPage;
  }

  onrolechange(){
    if(this.user.role == 'client'){
      this.displayClientInfo = true;
    }else{
      this.displayClientInfo = false;
    }
  }

  register(form,previous) {
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

      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('thankyou');
        //this.$state.go('admin');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}


class ThankyourController{

  constructor(Auth){

  }


}


angular.module('ytcwebUirouteApp')
  .controller('SignupController', SignupController)
  .controller('ThankyouController',ThankyourController);
