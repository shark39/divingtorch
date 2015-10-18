'use strict';

/**
 * @ngdoc function
 * @name sideNavApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the sideNavApp
 */
angular.module('divingtorchApp')
  .controller('SidenavCtrl', function ($scope, $mdSidenav, $model) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {});
    };

    $scope.devices = $model.devices;


    $scope.exists = function(name) {
    	return $model.applyTo.indexOf(name) >= 0;
    };
    $scope.toggle = function(name) {
    	if($scope.exists(name)) {
    		$model.applyTo.splice(name, 1);
    	} else {
    		$model.applyTo.push(name);
    	}
    };
  });
