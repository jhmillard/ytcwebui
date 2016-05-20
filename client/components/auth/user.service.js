'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    update:{
      method: 'PUT'
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    email: {
      method: 'POST',
      url: '/api/users/email'
    }
  });
}

angular.module('ytcwebUirouteApp.auth')
  .factory('User', UserResource);

})();
