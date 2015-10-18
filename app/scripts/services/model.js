'use strict';

/**
 * @ngdoc service
 * @name sideNavApp.model
 * @description
 * # model
 * Service in the sideNavApp.
 */
angular.module('divingtorchApp')
  .service('$model', function () {
    this.devices = {
    	"Horizontal" : {},
    	"Vertical" : {}
    };

    this.applyTo = [];
  });
