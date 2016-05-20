'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('ytcwebUirouteApp')
  .controller('MainController', MainController);



})();

angular.module('ytcwebUirouteApp')
  .controller('SplashTempController', function ($scope) {
    $scope.message = 'Hello';

    $scope.imageSrc = "assets/images/yeoman.png";
    $scope.imageToad = "assets/images/tree_frog_logo.jpg";
    $scope.imageBar = "assets/images/warehouse_header_short.jpg";

  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('green')
      .primaryPalette('green');
    $mdThemingProvider.theme('custom')
      .primaryPalette('red');
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('green')
      .warnPalette('red')
      .backgroundPalette('grey');
  });
