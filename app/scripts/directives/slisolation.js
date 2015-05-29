'use strict';

/**
 * @ngdoc directive
 * @name microApp.directive:slIsolation
 * @description
 * # slIsolation
 */
angular.module('microApp')
  .directive('slIsolation', function () {
    return {
      templateUrl: 'views/sl-isolation.html',
      controller: 'IsolationCtrl',
      restrict: 'E'
    };
  })
  .controller('IsolationCtrl', function($rootScope, $scope) {
    console.log("IsolationCtrl "+$scope.isolation.specimen.code);
    // $scope.isolation.changed=false;
    $scope.$watch('isolation.ufc', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.isolation.changed = true;
        $scope.test.changed = true;
      }
    });
    $scope.$watch('isolation.ufc', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.isolation.changed = true;
        $scope.test.changed = true;
      }
    });
    $scope.$watch('isolation.resistance', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.isolation.changed = true;
        $scope.test.changed=true;
      }
    });
    $scope.$watch('isolation.comments', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.isolation.changed = true;
      }
    });
  });
