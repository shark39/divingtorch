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
  $scope.color = '#FFFFFF';
  $scope.brightness = 100;
  $scope.colorList = [];
  for(var i=0; i<360; i += 40) {
    $scope.colorList.push(tinycolor("hsv(" + i + ",100%,100%)").toHexString());
  }
  $scope.colorList.push(tinycolor("hsv(0,0%,100%)").toHexString());
  $scope.brightnessList = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
  $scope.applyType = "move";
  $scope.getRGBColor = function(color) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      result = result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
      return (result.r << 16) + (result.g << 8) + result.b;
  }
  $scope.style = {'background-color' : '#FFFFFF'};
  $scope.style2 = {'background-color' : '#FFFFFF'};

  $scope.applyStop = false;
  $scope.applyColor = function(color, type) {
    if($scope.applyType == type && !$scope.applyStop) {
      $scope.send(color);
      $scope.applyStop = true;
      $scope.limiter = $timeout(function() {$scope.applyStop = false}, 100);
    }
  };

  $scope.send = function() {
    var color = tinycolor($scope.color).lighten(-100 + $scope.brightness).toHexString();
  	$scope.style = {'background-color' :$scope.color};
    $scope.style2 = {'background-color' :color};
  	$http.post('http://' + app.host + ':' + app.port + "/pixel", {rgb: $scope.getRGBColor(color), areas: $model.applyTo}, {headers: {  'Content-Type': 'application/json'  }});
  }

  $scope.setBrightness = function(value) {
    $scope.brightness = value;
    $scope.send($scope.color);
  };

  $scope.getBrightness = function(value) {
    return 'rgba(0,0,0,' + (1-value/100) + ')'; 
  };

  $scope.model = $model;
  
  
  }]);



