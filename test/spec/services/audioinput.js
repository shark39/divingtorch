'use strict';

describe('Service: audioInput', function () {

  // load the service's module
  beforeEach(module('divingtorchApp'));

  // instantiate service
  var audioInput;
  beforeEach(inject(function (_audioInput_) {
    audioInput = _audioInput_;
  }));

  it('should do something', function () {
    expect(!!audioInput).toBe(true);
  });

});
