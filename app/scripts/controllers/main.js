'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the divingtorchApp
 */
angular.module('divingtorchApp')
  .controller('MainCtrl', ['$scope', '$model', function ($scope, $model) {
  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.model = $model;
  
  
  }]);



