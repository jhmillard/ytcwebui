'use strict';


class UserImgCtrl {

  constructor(Auth, $scope, User, $stateParams) {

    this.User = User;
    this.currentUser = this.User.get({id: $stateParams.userid}, ()=>{

    })

  }

  update(previouspage){
    this.User.update(this.currentUser,()=>{
      window.history.back();
    });
  }

};




angular.module('ytcwebUirouteApp')
  .controller('UserImgCtrl',UserImgCtrl);
