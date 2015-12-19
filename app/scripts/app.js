'use strict';

/**
 * @ngdoc overview
 * @name divingtorchApp
 * @description
 * # divingtorchApp
 *
 * Main module of the application.
 */
angular
  .module('divingtorchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAria',
    'ngMaterial',
    'ngTouchmove'
  ]).value('appName', 'Shark LED')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/effects', {
        templateUrl: 'views/effects.html',
        controller: 'EffectsCtrl',
        controllerAs: 'effects'
      })
      .otherwise({
        redirectTo: '/effects'
      });
  });
