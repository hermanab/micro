'use strict';
/**
 * Created by alf on 29/03/15.
 */

// var sl_server='http://192.168.99.97';

angular.module('microApp')
  .controller('TestsCtrl', ['$scope', '$element', '$http', '$timeout', 'tests_available', 'close', 'focus', 'sl_server',
    function($scope, $element, $http, $timeout, tests_available, close, focus, sl_server) {
      $scope.tests_available=tests_available;
      $scope.test_sel={test:""};
      console.log("TestsCtrl:");
      console.log($scope.tests_available);

      $timeout(function() {
        focus("input-test")
      }, 200);

      $scope.close = function(result) {
        if (result) result=$scope.test_sel.test;
        else result="";
        close(result, 500); // close, but give 500ms for bootstrap to animate
      };

      $scope.onKeyPress = function(event) {
        console.log(event.keyCode);
        if (event.keyCode == 13) {
          $element.modal('hide');
          $scope.close(true); // close, but give 500ms for bootstrap to animate
        }
        if (event.keyCode == 27) {
          $element.modal('hide');
          $scope.close(false); // close, but give 500ms for bootstrap to animate
        }
      }
    }])
