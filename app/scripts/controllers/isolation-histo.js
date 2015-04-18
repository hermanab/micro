'use strict';
/**
 * Created by alf on 29/03/15.
 */

// var sl_server_iso='http://192.168.99.97';

angular.module('microApp')
  .controller('IsolationHistoCtrl', ['$scope', '$element', '$http', '$timeout', 'isoid', 'isolation', 'close', 'focus', 'sl_server',
    function($scope, $element, $http, $timeout, isoid, isolation, close, focus, sl_server) {
    var url = sl_server + '/wksanal/isolation_histo_atb/?post={"idiso":"$isoid$","mode":1}';
    url = url.replace("$isoid$", isoid);
    $scope.isolation=isolation;

    $http.get(url)
      .success(function (data) {
        $scope.histo = data.data;
        var ids=$scope.histo[0];
        for (var i=1; i < ids.length; i++) {
          if (isoid == ids[i]) {
            $scope.colMainIso=i;
            break;
          }
        }
      }
    );

    $scope.close = function (result) {
      close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.classATB = function(iso, index) {
      if (index >= 7) {
        var atb="";
        for (var i=0; i < iso.length; i++) {
          if (i == 0) continue;
          var c_atb=iso[i];
          if (c_atb == "" || c_atb == "-" || c_atb == null) continue;
          if (atb == "" || atb == "-") atb=c_atb;
          else {
            if (atb == c_atb) continue;
            return "atb-changed";
          }

        }
      }
      return "";
    }

    $scope.showRow = function(index) {
      if (index == 0) return false;
      if (index == 5) return false;
      if (index == 6) return false;
      return true;
    }

  }]);

