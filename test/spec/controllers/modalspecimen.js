'use strict';

describe('Controller: ModalspecimenCtrl', function () {

  // load the controller's module
  beforeEach(module('microApp'));

  var ModalspecimenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalspecimenCtrl = $controller('ModalspecimenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
