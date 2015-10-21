'use strict';

/**
 * @ngdoc function
 * @name sideNavApp.controller:SidenavCtrl
 * @description
 * # SidenavCtrl
 * Controller of the sideNavApp
 */
angular.module('divingtorchApp')
  .controller('SidenavCtrl', function ($scope, $mdSidenav, $model, $http, app) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {});
    };

    $http.get(app.url() + 'areas').success(
    	function(response){
	    	$scope.devices = response.areas;	
            $model.applyTo = response.areas;
	    });	    

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
