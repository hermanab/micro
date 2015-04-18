'use strict';

describe('Controller: ModalSpecimenCtrl', function () {

  // load the controller's module
  beforeEach(module('microApp'));

  var ModalSpecimenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalSpecimenCtrl = $controller('ModalSpecimenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
