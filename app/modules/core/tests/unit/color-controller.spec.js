'use strict';

describe('Controller: ColorController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var ColorController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ColorController = $controller('ColorController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
