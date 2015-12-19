'use strict';

/**
 * @ngdoc function
 * @name divingtorchApp.controller:EffectsCtrl
 * @description
 * # EffectsCtrl
 * Controller of the divingtorchApp
 */
angular.module('divingtorchApp')
    .controller('EffectsCtrl', ['$scope', '$http', '$mdDialog', '$mdMedia', 'app', function ($scope, $http, $mdDialog, $mdMedia, app) {
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
                "name": "bucketcolor",
                "parameters": {
                    "interval": 1000,
                    "width": 10,
                    "colors": [[1, 0, 0], [0, 0, 1]]
                }
        }];

        $http.get(app.url() + 'areas').success(
            function (response) {
                $scope.areas = response.areas;
            });



        $scope.changeEffect = function (effect) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            var oldParameters = angular.copy(effect.parameters);
            $mdDialog.show({
                    controller: function ($scope) {
                        $scope.effect = effect;
                        
                        $scope.creating = $scope.effect.areas == undefined;
                        
                        $scope.effect.areas = $scope.effect.areas || ["Wand"];
                        $scope.areas = ["Wand", "Balken1"];
                        $scope.cancel = function () {
                            $mdDialog.cancel()
                        };
                        $scope.answer = function () {
                            $mdDialog.hide(true)
                        };
                        $scope.exists = function (name) {
                            return effect.areas.indexOf(name) >= 0;
                        };
                        $scope.toggle = function (name) {
                            if ($scope.exists(name)) {
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
                    if (!effect.id) {
                        $http({
                            method: 'POST',
                            url: app.url() + 'effects/' + name,
                            data: effect

                        }).then(function successCallback(response) {
                            effect.id = response['data'];
                            $scope.changeEffect(effect);
                            $scope.activeEffects.push(effect);
                            $mdDialog.hide();
                        });
                    } else {
                        $http({
                            method: 'POST',
                            url: app.url() + 'adjust/' + effect.id,
                            data: effect

                        }).then(function successCallback(response) {
                            $mdDialog.hide()
                        });
                    }
                }, function () {
                    effect.parameters = oldParameters;
                });
        }

        $scope.addEffect = function (id) {
            var effect = angular.copy($scope.effectChoices[id]);
            effect.paused = false;





            $scope.changeEffect(effect);



        };

    }]);