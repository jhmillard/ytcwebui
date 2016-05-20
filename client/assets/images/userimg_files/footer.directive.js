'use strict';

angular.module('ytcwebUirouteApp').directive('foot', function () {
  return {
    templateUrl: 'components/footer/footer.tp.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('foot');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map
