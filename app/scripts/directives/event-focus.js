/**
 * Created by alf on 3/04/15.
 */

angular.module('microApp')
.directive('eventFocus', function(focus) {
  return function(scope, elem, attr) {
    elem.on(attr.eventFocus, function() {
      focus(attr.eventFocusId);
    });

    // Removes bound events in the element itself
    // when the scope is destroyed
    scope.$on('$destroy', function() {
      element.off(attr.eventFocus);
    });
  };
});
