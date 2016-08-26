'use strict';

class LoginControllerTP {
  constructor(Auth, $state, User) {
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

    //TO DO - Figure out how to make the main login
    //if(this.isLoggedIn){
    //  if (this.getCurrentUser.role == 'admin') {
    //    this.$state.go('admindash')
    //  }
    //  else if (this.getCurrentUser.role == 'client') {
    //    this.$state.go('clientdash')
    //  }
    //  else if (this.getCurrentUser.role == 'contractor') {
    //    this.$state.go('contractordash')
    //  }
    //  else {
    //    this.$state.go('main');
    //  }
    //}
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home

          //grab the user
          this.userinfo = this.userObj.get({id: this.Auth.getCurrentUser()._id},()=>{
            if(this.userinfo.validated == false){
              this.$state.go('thankyou');
              this.Auth.logout();
            }else {
              if (this.userinfo.role == 'admin') {
                this.$state.go('admindash')
              }
              else if (this.userinfo.role == 'client') {
                this.$state.go('clientdash')
              }
              else if (this.userinfo.role == 'contractor') {
                this.$state.go('contractordash')
              }
              else {
                this.$state.go('main');
              }
            }

          });

        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('ytcwebUirouteApp')
  .controller('LoginControllerTP', LoginControllerTP);
