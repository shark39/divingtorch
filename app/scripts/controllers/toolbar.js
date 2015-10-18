'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the divingtorchApp
 */
angular.module('divingtorchApp')
  .controller('ToolbarCtrl', ['$scope', '$mdSidenav', 'app', function ($scope, $mdSidenav, app) {
  	$scope.openSideNav = function () {
  		$mdSidenav("left").toggle();
  	};
    $scope.appName = app.name;
  }]);
