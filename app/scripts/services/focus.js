/**
 * Created by alf on 3/04/15.
 */

angular.module('microApp')
.factory('focus', function($timeout) {
  return function(id) {
    // timeout makes sure that it is invoked after any other event has been triggered.
    // e.g. click events that need to run before the focus or
    // inputs elements that are in a disabled state but are enabled when those events
    // are triggered.
    $timeout(function() {
      var element = document.getElementById(id);
      if(element) {
        element.focus();
      }
    });
  };
});
