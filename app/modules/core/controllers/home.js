/*global $scope, angular, console */
/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HomeController', ['$scope', 'jsSpeechFactory', 'Speechconversion', 'Sharkled',
        function ($scope, jsSpeechFactory, Speechconversion, Sharkled) {
            'use strict';



            $scope.myModel = {
                value: "color Wand parameters color green"
            };
            $scope.lastEffect = {};

            $scope.$watch('myModel', function (current, old) {
                console.log(current, old);
                if (old.recognizing === true && current.recognizing === false) {
                    console.log("changed");
                    $scope.makeRequest();
                }
            }, true);

            $scope.makeRequest = function () {

                Sharkled.postNaturalLanguage($scope.myModel.value, function (data) {
                    console.log("success");
                    $scope.lastEffect = data.effect;
                });
            };

            $scope.reset = function () {
                Sharkled.reset();
            };
        }
        ]);