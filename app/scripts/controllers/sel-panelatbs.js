'use strict';
/**
 * Created by alf on 29/03/15.
 */

// var sl_server='http://192.168.99.97';

angular.module('microApp')
  .controller('PanelATBsCtrl', ['$scope', '$element', '$http', '$timeout', 'close', 'focus', 'sl_server',
    function($scope, $element, $http, $timeout, close, focus, sl_server) {
    var url=sl_server+"/wksanal/load_atbpanels/";
    $http.get(url)
      .success(function(data) {
        $scope.panels=data.data;
      }
    );
    $scope.panel_sel={panel:""}

    $timeout(function() {
      focus("input-panel")
    }, 200);

    $scope.close = function(result) {
      if (result) result=$scope.panel_sel.panel;
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
