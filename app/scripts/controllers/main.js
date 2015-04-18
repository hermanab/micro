'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Python'
    ];
  });
