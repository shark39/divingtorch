/*global angular, console*/

/**
 * @ngdoc function
 * @name core.controller:EffectsController
 * @description
 * # EffectsCtrl
 * Controller of the divingtorchApp
 */
angular.module('core')
    .controller('EffectsController', ['$scope', '$http', '$mdDialog', '$mdMedia', 'Sharkled',
                            function ($scope, $http, $mdDialog, $mdMedia, Sharkled) {
            'use strict';

            $scope.activeEffects = [];
            $scope.effectChoices = [];
            $scope.areas = [];

            Sharkled.getAreas(
                function (response) {
                    $scope.areas = response.areas;
                }
            );

            Sharkled.getEffects(
                function (response) {
                    $scope.effectChoices = response.effects;
                }
            );


            $scope.changeEffect = function (effect) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')),
                    oldParameters = angular.copy(effect.parameters);
                $mdDialog.show({
                    controller: function (scope) {
                        scope.effect = effect;
                        scope.creating = scope.effect.areas === undefined;
                        scope.effect.areas = scope.effect.areas || ["Wand"];
                        scope.areas = $scope.areas;
                        scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                        scope.answer = function () {
                            $mdDialog.hide(true);
                        };
                        scope.exists = function (name) {
                            return effect.areas.indexOf(name) >= 0;
                        };
                        scope.toggle = function (name) {
                            if (scope.exists(name)) {
                                effect.areas.splice(name, 1);
                            } else {
                                effect.areas.push(name);
                            }
                        };
                    },
                    templateUrl: 'modules/core/views/effect-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                    .then(function () {
                        Sharkled.postEffect(effect.name, effect, function callback(data) {
                            effect.id = data.id;
                            $scope.changeEffect(effect);
                            $scope.activeEffects.push(effect);
                            $mdDialog.hide();
                        });
                    });
            };

            $scope.addEffect = function (id) {
                var effect = angular.copy($scope.effectChoices[id]);
                effect.paused = false;
                $scope.changeEffect(effect);
            };



        }]);