'use strict';

describe('Service: sl', function () {

  // load the service's module
  beforeEach(module('microApp'));

  // instantiate service
  var sl;
  beforeEach(inject(function (_sl_) {
    sl = _sl_;
  }));

  it('should do something', function () {
    expect(!!sl).toBe(true);
  });

});
