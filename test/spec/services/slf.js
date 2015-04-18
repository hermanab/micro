'use strict';

describe('Service: slF', function () {

  // load the service's module
  beforeEach(module('microApp'));

  // instantiate service
  var slF;
  beforeEach(inject(function (_slF_) {
    slF = _slF_;
  }));

  it('should do something', function () {
    expect(!!slF).toBe(true);
  });

});
