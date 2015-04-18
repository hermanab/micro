'use strict';
/**
 * Created by alf on 29/03/15.
 */

angular.module('microApp')
  .controller('TestCommentCtrl', ['$scope', '$element', '$http', '$timeout', 'comment', 'ptexts', 'close', 'focus',
    function($scope, $element, $http, $timeout, comment, ptexts, close, focus) {
    $scope.ptexts=ptexts;
    $scope.comment=comment;

    console.log("test comment");
    $timeout(function() {
      focus("input-panel")
    }, 200);

    $scope.close = function(result) {
      if (result) result=$scope.comment;
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
  }]);
