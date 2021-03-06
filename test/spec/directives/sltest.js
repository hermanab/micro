'use strict';

describe('Directive: slTest', function () {

  // load the directive's module
  beforeEach(module('microApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sl-test></sl-test>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the slTest directive');
  }));
});
