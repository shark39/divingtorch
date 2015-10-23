'use strict';

describe('Controller: AudioinputCtrl', function () {

  // load the controller's module
  beforeEach(module('divingtorchApp'));

  var AudioinputCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AudioinputCtrl = $controller('AudioinputCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AudioinputCtrl.awesomeThings.length).toBe(3);
  });
});
