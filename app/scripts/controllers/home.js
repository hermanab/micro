'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
