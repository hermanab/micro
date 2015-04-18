'use strict';
/**
 * Created by alf on 2/04/15.
 */

angular.module('microApp')
  .controller('PredefinedTextsCtrl', ['$scope', '$element', '$timeout', 'testcode', 'ptexts', 'close', 'focus', function($scope, $element, $timeout, testcode, ptexts, close, focus) {
    $scope.ptexts=ptexts;

    // focus("predeftextid");
    $scope.setFocus = function() {
      console.log("func set_focus");
      focus("predeftextid");
    }
    $timeout(function() {
      // $("#predeftext-focus").click();
      focus("predeftextid");
    }, 200);

    $scope.close = function(result) {
      console.log("sel: "+$scope.selected);
      if (result) result=$scope.selected;
      else result="$cancel$";
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

  }]);
