'use strict';

describe('Service: communicator', function () {

  // load the service's module
  beforeEach(module('sideNavApp'));

  // instantiate service
  var communicator;
  beforeEach(inject(function (_communicator_) {
    communicator = _communicator_;
  }));

  it('should do something', function () {
    expect(!!communicator).toBe(true);
  });

});
