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
  	host: window.location.hostname,
  	port: 9000
  });
