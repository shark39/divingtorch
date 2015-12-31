'use strict';

describe('Controller: EffectsController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var EffectsController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        EffectsController = $controller('EffectsController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
