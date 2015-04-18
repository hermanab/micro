'use strict';
/**
 * Created by alf on 29/03/15.
 */

// var sl_server='http://192.168.99.97';

angular.module('microApp')
  .controller('SpecimenCtrl', ['$scope', '$element', '$http', '$timeout', 'close', 'focus', 'sl_server',
    function($scope, $element, $http, $timeout, close, focus, sl_server) {
    var url=sl_server+"/wksanal/load_specimens/";
    $http.get(url)
      .success(function(data) {
        $scope.specimens=data.data;
        console.log($scope.specimens);
      }
    );

    $timeout(function() {
      focus("input-specimen")
    }, 400);

    $scope.getSpecimens = function(val) {
      var url=sl_server+'/wksanal/load_specimens/?post={"filter":"$filter"}';
      url=url.replace("$filter", val);
      console.log(url);
      $http.get(url)
        .then(function(response) {
          console.log(response.data.data);
          return response.data.data.map(function(item) {
            return item.name;
          });
        }
      );


    }

    $scope.close = function(result) {
      console.log("sel: "+$scope.selected);
      if (result) result=$scope.selected;
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
