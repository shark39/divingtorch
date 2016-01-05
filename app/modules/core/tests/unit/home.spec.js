'use strict';

describe('HomeController', function() {

    var HomeController, scope;

    //Load the ui.router module
    beforeEach(module('ui.router'));
    // Load the main application module
    beforeEach(module('core'));

    beforeEach(inject(function($controller, $rootScope) {

        scope = $rootScope.$new();

        HomeController = $controller('HomeController', {
            $scope : scope
        });
    }));

    //Tests
    
});
