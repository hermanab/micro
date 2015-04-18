'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:ModalSpecimenCtrl
 * @description
 * # ModalSpecimenCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('ModalSpecimenCtrl', function ($scope, $modal, $log) {
    var url="/wksanal/load_specimens/";
    $http.get(url)
      .success(function(data) {
        $scope.specimens=data.data;
      }
    );
    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'modalSpecimen.html',
        controller: 'ModalSpecimenInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.specimens;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  });


angular.module('microApp')
  .controller('ModalSpecimenInstanceCtrl', function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
