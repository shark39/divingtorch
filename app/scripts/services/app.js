'use strict';

/**
 * @ngdoc service
 * @name divingtorchApp.app
 * @description
 * # app
 * Value in the divingtorchApp.
 */
angular.module('divingtorchApp')
  .value('app', {
  	name: "Shark LED",
  	url: 'http://192.168.0.105:5000'
  });
