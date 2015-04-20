'use strict';

/**
 * @ngdoc directive
 * @name microApp.directive:slTest
 * @description
 * # slTest
 */
angular.module('microApp')
  .directive('slTest', function () {
    return {
      templateUrl: 'views/sl-test.html',
      controller: 'TestCtrl',
      restrict: 'E'
      /*link: function postLink(scope, element, attrs) {
        element.text('this is the slTest directive');
      }*/
    };
  })
  .controller('TestCtrl', function($rootScope, $scope) {
    console.log("TestCtrl "+$scope.test.testid.code);
    // $scope.test.changed=false;
    $scope.$watch('test.valueq', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.test.changed = true;
        $scope.test.status = 3;
      }
    })
    $scope.$watch('test.valuetxt', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.test.changed = true;
        $scope.test.status = 3;
      }
    })
    $scope.$watch('test.comments', function(newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.test.changed=true;
        $scope.test.status=3;
      }
    })
    $scope.$watch('test.status', function(newValue, oldValue) {
      if (newValue != oldValue)
        $scope.test.changed=true;
    })
  });
