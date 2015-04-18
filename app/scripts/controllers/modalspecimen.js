'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:ModalspecimenCtrl
 * @description
 * # ModalspecimenCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('ModalspecimenCtrl', function ($scope, $modal, $log) {
    var url="/wksanal/load_specimens/";
    $http.get(url)
      .success(function(data) {
        $scope.specimens=data.data;
      }
    );

  });
