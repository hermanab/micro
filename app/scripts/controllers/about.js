'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
