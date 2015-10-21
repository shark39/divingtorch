'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the divingtorchApp
 */
angular.module('divingtorchApp')
  .controller('MainCtrl', ['$scope', '$model', 'app', '$http', '$timeout', function ($scope, $model, app, $http, $timeout) {
  $scope.color = '#000000';
  $scope.colorList = ["#5484ED", "#A4BDFC", "#46D6DB", "#7AE7BF",
    "#51B749", "#FBD75B", "#FFB878", "#FF887C", "#DC2127",
    "#DBADFF", "#E1E1E1"];
  $scope.applyType = "move";
  $scope.getColor = function() {
  	return $scope.color;  
  }
  $scope.style = {'background-color' : '#FFFFFF'};

  $scope.applyStop = false;
  $scope.applyColor = function(color, type) {
    if($scope.applyType == type && !$scope.applyStop) {
      $scope.send(color);
      $scope.applyStop = true;
      $scope.limiter = $timeout(function() {$scope.applyStop = false}, 100);
    }
  };

  $scope.send = function() {
  	var color = parseInt($scope.color, 16);
  	$scope.style = {'background-color' : $scope.getColor()};
  	$http.post(app.url + "/pixel", {rgb: color, areas: $model.applyTo}, {headers: {  'Content-Type': 'application/json'  }});
  }

  $scope.model = $model;
  
  
  }]);



