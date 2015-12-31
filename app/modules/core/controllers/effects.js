'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:EffectsCtrl
 * @description
 * # EffectsCtrl
 * Controller of the divingtorchApp
 */
angular.module('core')
    .controller('EffectsController', ['$scope', '$http', '$mdDialog', '$mdMedia', 'sharkled', function ($scope, $http, $mdDialog, $mdMedia, sharkled) {
                $scope.activeEffects = [];
                $scope.effectChoices = [{
                        "name": "color",
                        "parameters": {
                            "color": [1, 1, 1]
                        }
        }, {
                        "name": "chase",
                        "parameters": {
                            "interval": 1000,
                            "width": 1,
                            "softWidth": 0
                        }
        }, {
                        "name": "colorsequence",
                        "parameters": {
                            "interval": 1000,
                            "colors": [[1, 0, 0], [0, 0, 1]]
                        }
        }, {
                        "name": "rainbow",
                        "parameters": {
                            "interval": 1000,
                            "wavelength": 1
                        }
        }, {
                        "name": "pulsate",
                        "parameters": {
                            "interval": 1000,
                            "wavelength": 1
                        }
        }, {
                        "name": "strobe",
                        "parameters": {
                            "interval": 1000
                        }
        },
                    {
                        "name": "bucketColor",
                        "parameters": {
                            "interval": 1000,
                            "width": 10,
                            "colors": [[1, 0, 0], [0, 0, 1]]
                        }
        }];

                sharkled.getAreas(
                    function (response) {
                        $scope.areas = response.areas;
                    });



                $scope.changeEffect = function (effect) {
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                    var oldParameters = angular.copy(effect.parameters);
                    $mdDialog.show({
                            controller: function (scope) {
                                scope.effect = effect;

                                scope.creating = scope.effect.areas == undefined;

                                scope.effect.areas = scope.effect.areas || ["Wand"];
                                scope.areas = $scope.areas;
                                scope.cancel = function () {
                                    $mdDialog.cancel()
                                };
                                scope.answer = function () {
                                    $mdDialog.hide(true)
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
                            templateUrl: 'views/effect-dialog.html',
                            parent: angular.element(document.body),
                            targetEvent: null,
                            clickOutsideToClose: true,
                            fullscreen: useFullScreen
                        })
                        .then(function () {
                                $http({
                                    method: 'POST',
                                    url: 'http://192.168.0.99:9000/effect/' + effect.name,
                                    data: JSON.stringify(effect)

                                }).then(function successCallback(response) {
                                    effect.id = response['data'];
                                    $scope.changeEffect(effect);
                                    $scope.activeEffects.push(effect);
                                    $mdDialog.hide();
                                });
                            };

                            $scope.addEffect = function (id) {
                                var effect = angular.copy($scope.effectChoices[id]);
                                effect.paused = false;
                                $scope.changeEffect(effect);
                            };



                        }]);