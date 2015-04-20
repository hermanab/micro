'use strict';

/**
 * @ngdoc overview
 * @name microApp
 * @description
 * # microApp
 *
 * Main module of the application.
 */
angular
  .module('microApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    // 'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router',
    'cfp.hotkeys',
    'angularModalService',
    'ui.select',
    'ng-context-menu',
    'ui.scrollfix'
  ])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html'
    });

    $stateProvider.state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    });

    /**/
    $stateProvider.state('order.sample', {
      url: '/sample/:sampleidee?user',
      templateUrl: 'views/sample.html',
      controller: 'SampleCtrl'
    });


    $stateProvider.state('order.section', {
      url: '/order/:orderid/section/:section',
      templateUrl: 'views/section.html',
      controller: 'SectionCtrl'
    });

    $stateProvider.state('orderxx', {
      url: '/orderxx/:orderid/sample/:sampleidee?user',
      // url: '/order/:orderid',
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    });

    $stateProvider.state('order', {
      url: '/order/:orderid',
      // url: '/order/:orderid',
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    });


  }])
  .value('sl_server', 'http://10.64.0.49:19010');


