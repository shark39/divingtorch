'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the divingtorchApp
 */
angular.module('divingtorchApp')
  .controller('MainCtrl', ['$scope', '$model', 'app', '$http', function ($scope, $model, app, $http) {
  $scope.color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  };

  $scope.getColor = function() {
  	return 'rgb(' + $scope.color.red + ',' + $scope.color.green + ',' + $scope.color.blue + ')';  
  }
  $scope.style = {'background-color' : '#FFFFFF'};
  $scope.applyColor = function() {
  	var color = $scope.color.blue + ($scope.color.green * 256) + ($scope.color.red * 256 * 256);
  	$scope.style = {'background-color' : $scope.getColor()};
  	$http.post(app.url + "/pixel", {pixel: "[0:149]", rgb: color}, {headers: {  'Content-Type': 'application/json'  }});
  }

  $scope.model = $model;
  
  
  }]);



