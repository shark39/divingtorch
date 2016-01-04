'use strict';

/**
 * @ngdoc directive
 * @name sideNavApp.directive:colorPicker
 * @description
 * # colorPicker
 */
angular.module('core')
  .directive('colorPicker', function () {
    return {
      template: '<div layout="row" layout-fill style="height:100px; min-height:20px"><div flex ng-repeat="colorEl in colorList" style="border: {{color == colorEl}}px solid #000;\
      				background-color: {{colorEl}}" ng-touchmove="selectColor(colorEl,\'move\')" ng-mousemove="selectColor(colorEl,\'move\')" ng-click="selectColor(colorEl,\'click\')"></div>\
      			</div>',
      restrict: 'E',
      scope: {
      	colorList: "=",
      	color: "=",
      	onChange: "="
      },
      link: function postLink(scope, element, attrs) {
      },
      controller: function($scope, $element, $timeout) {
        $scope.selectColor = function(color, type) {
        	$scope.color = color;
        	if($scope.onChange) $scope.onChange(color, type);};
      	}
    };
  });
