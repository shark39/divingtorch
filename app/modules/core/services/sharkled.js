/*global angular, $http, console, JSON*/
/*jslint plusplus: true */
/**
 * @ngdoc service
 * @name core.Services.Sharkled
 * @description Sharkled API Abstraction
 */
angular
    .module('core')
    .factory('Sharkled', ['$http',
        function ($http) {
            'use strict';

            var baseUrl = 'http://192.168.0.99:9000',
                api = {

                    /**
                     * @ngdoc function
                     * @name core.Services.Sharkled#getAreas
                     * @methodOf core.Services.Sharkled
                     * @return {json} Returns data
                     */
                    getAreas: function (callback) {
                        $http({
                            method: 'GET',
                            url: baseUrl + '/areas'
                        }).then(function successCallback(response) {
                            callback(response.data);

                        }, function errorCallback(response) {
                            console.log("error areas");
                        });
                    },

                    /**
                     * @ngdoc function
                     * @name core.Services.Sharkled#getEffects
                     * @methodOf core.Services.Sharkled
                     * @return {json} Returns data
                     */
                    getEffects: function (callback) {
                        $http({
                            method: 'GET',
                            url: baseUrl + '/effects'
                        }).then(function successCallback(response) {
                            callback(response.data);
                        }, function errorCallback(response) {
                            console.log("error effects");
                        });
                    },
                    /**
                     * @ngdoc function
                     * @name core.Services.Sharkled#getEffects
                     * @methodOf core.Services.Sharkled
                     * @return {json} Returns data
                     */
                    getDefaultParameters: function (name, callback) {
                        $http({
                            method: 'GET',
                            url: baseUrl + '/effects'
                        }).then(function successCallback(response) {
                            var i;

                            for (i = 0; i < response.data.effects.length; i++) {
                                if (response.data.effects[i].name === name) {
                                    callback(response.data.effects[i].parameters);
                                    return true;
                                }
                            }
                            console.log("effect ", name, " not found.");
                        }, function errorCallback(response) {
                            console.log("error effects");
                        });
                    },
                    postNaturalLanguage: function (text, callback) {
                        $http({
                            method: 'POST',
                            url: baseUrl + '/nlp/effect',
                            data: JSON.stringify({
                                "text": text
                            })
                        }).then(function successCallback(response) {
                            callback(response.data);
                        }, function errorCallback(response) {
                            console.log("error nl effects");
                        });
                    },
                    reset: function () {
                        $http({
                            method: 'POST',
                            url: baseUrl + '/reset'
                        }).then(function successCallback(response) {
                            angular.noop();
                        }, function errorCallback(response) {
                            console.log("error reset effects");
                        });
                    },
                    postEffect: function (name, parameters, callback) {
                        debugger;
                        $http({
                            method: 'POST',
                            url: baseUrl + '/effect/' + name,
                            data: JSON.stringify(parameters),
                            headers: {'Content-Type': 'application/json'}

                        }).then(function successCallback(response) {
                            callback(response.data);
                        }, function errorCallback(response) {
                            console.log("error effects");
                        });

                    }
                }; // close api
            return api;
        }
                         ]);