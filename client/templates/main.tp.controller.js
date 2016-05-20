/**
 * Created by yellowtoadconsulting1 on 3/7/16.
 */

'use strict';

class MainControllerTP{
  constructor(Auth,$scope){
   this.testVariable = "TEST VARIABLE";
  }
}

angular.module('ytcwebUirouteApp')
  .controller('MainControllerTP',MainControllerTP);
