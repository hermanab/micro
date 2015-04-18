'use strict';
/**
 * Created by alf on 29/03/15.
 */

// var sl_server='http://192.168.99.97';

angular.module('microApp')
  .controller('ATBsCtrl', ['$scope', '$element', '$http', '$timeout', 'close', 'focus', 'sl_server',
    function($scope, $element, $http, $timeout, close, focus, sl_server) {
    var url=sl_server+"/wksanal/load_atbs/";
    $http.get(url)
      .success(function(data) {
        $scope.atbs=data.data;
      }
    );
    $scope.atb_sel={atb:""}

    $timeout(function() {
      focus("input-atb")
    }, 200);

    $scope.close = function(result) {
      if (result) result=$scope.atb_sel.atb;
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
