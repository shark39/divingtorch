'use strict';

describe('Controller: EffectsCtrl', function () {

  // load the controller's module
  beforeEach(module('divingtorchApp'));

  var EffectsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EffectsCtrl = $controller('EffectsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EffectsCtrl.awesomeThings.length).toBe(3);
  });
});
