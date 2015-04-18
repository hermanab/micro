'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('SectionCtrl', function ($rootScope, $scope, $state, $http, $stateParams) {
    $scope.section = $stateParams.section;

    $scope.results=[];
    $scope.comments=[];
    var results=$scope.order.sl_order.results;
    var tests=$scope.order.sl_order.tests;
    for (var spe in results) {
      var spe_results=results[spe];
      for (var sec in spe_results) {
        if (sec == $scope.section) {
          for (var tk in spe_results[sec]) {
            console.log(tk);
            if (tk === "notes") {
              var notes=spe_results[sec][tk];
              for (var n in notes) {
                var note=notes[n];
                if (note.isnull) continue;
                $scope.comments.push(note);
              }
              continue;
            }
            $scope.results.push({test:tests[tk], result:spe_results[sec][tk]});
          }
          console.log($scope.results);
          break;
        }
      }
    };

    $scope.testStatusImage = function(test) {
      switch (test.state) {
        case "ORDERED": return "images/ORDERED.png";
        case "RERUN": return "images/RERUN.png";
        case "RECEIVED": return "images/RECEIVED.png";
        case "VALIDATED": return "images/VALIDATED.png";
        case "CANCELED": return "images/CANCELLED.png";
      }
    }


  });
