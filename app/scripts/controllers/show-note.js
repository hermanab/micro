'use strict';
/**
 * Created by alf on 29/03/15.
 */

angular.module('microApp')
  .controller('ShowNoteCtrl', ['$scope', '$element', '$http', '$timeout', 'title', 'comment','close', 'focus',
    function($scope, $element, $http, $timeout, title, comment, close, focus) {

      console.log("show-note controller "+comment);
      $scope.title=title;
      $scope.comment=comment;

      $scope.close = function(result) {
        result="";
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
