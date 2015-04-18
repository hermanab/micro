'use strict';

/**
 * @ngdoc directive
 * @name microApp.directive:slTest
 * @description
 * # slTest
 */
angular.module('microApp')
  .directive('slSectionResult', function () {
    return {
      templateUrl: 'views/sl-section-result.html',
      restrict: 'E'
      /*link: function postLink(scope, element, attrs) {
       element.text('this is the slTest directive');
       }*/
    };
  });
