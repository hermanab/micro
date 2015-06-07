'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the microApp
 */
angular.module('microApp')
  .controller('OrderCtrl', ['$rootScope', '$scope', '$state', '$http', '$stateParams', 'ModalService', 'sl_server',
    function ($rootScope, $scope, $state, $http, $stateParams, ModalService, sl_server) {
    var orderid=$stateParams.orderid;
    var sampleidee=$stateParams.sampleidee;
    $scope.user=$stateParams.user;
    console.log("User: "+$scope.user);

    var url=sl_server+'/wksanal/get_order/?post={"orderid":"$orderid", "mode":1}';
    console.log(url);
    url=url.replace("$orderid", orderid);
    $scope.sampleidee=sampleidee;
    $scope.loaded=false;
    $scope.section={active: false};

    $http.get(url)
      .success(function(data) {
        $scope.order=data.data;

        Array.prototype.forEach.call($scope.order.samples, function(sample) {
          if (sampleidee == "*") {
            sampleidee=sample.idee;
          }
          if (sample.idee == sampleidee) {
            sample.active=true;
          }
          else {
            sample.active=false;
          }

          sample.route="order/"+$scope.order.idee+"/sample/"+sample.idee+"?user="+$scope.user;
        });
        $scope.loaded=true;
        console.log($scope.order.samples);
      }
    );

    $scope.go = function(sidee) {
      console.log("go "+sidee);
      url="#/order/"+$scope.order.idee+"/sample/"+sidee+"?user="+$scope.user;
      console.log(url);
      $state.go("order.sample", {orderid:$scope.order.idee, sampleidee:sidee});
    };

    $scope.sampleActive = function(sample) {
      if (sample.active) return "active";
      return "";
    }

    $scope.hasSection = function(section) {
      var results=$scope.order.sl_order.results;
      for (var spe in results) {
        var results_spe=results[spe];
        for (var sec in results_spe) {
          if (sec === section) {
            return true;
          }
        }
      }
      return false;
    }

    $scope.showSection = function(section) {
      url="#/order/"+$scope.order.idee+"/section/"+section;
      console.log(url);
      $state.go("order.section", {orderid:$scope.order.idee, section:section});
    }

    $scope.statusSectionClass = function(section) {
      var results=$scope.order.sl_order.results;
      var tests=$scope.order.sl_order.tests;
      var ordered=false;
      var validated=false;
      var cancelled=false;
      var finished=true;
      for (var spe in results) {
        var results_spe=results[spe];
        for (var sec in results_spe) {
          if (sec === section) {
            for (var tk in results_spe[sec]) {
              if (tk == "notes") continue;
              var test_node=tests[tk];
              console.log(tk+":"+test_node.state);
              if (test_node.state === "RECEIVED") return "tab-header received";
              if (test_node.state === "RERUN" || test_node.state === "RECEIVED") ordered=true;
              if (test_node.state === "VALIDATED") validated=true;
              if (test_node.state === "CANCELED") cancelled=true;
            }
            finished=true;
            break;
          }
        }
        if (finished) break;
      }
      if (ordered) {
        console.log("ordered");
        return "tab-header pending";
      }
      if (validated) {
        console.log("validated");
        return "tab-header validated";
      }
      if (cancelled) {
        console.log("cancelled");
        return "tab-header cancelled";
      }
      console.log("pending default");
      return "tab-header pending";

    }

    $scope.sampleStatusClass = function(sample) {
      switch (sample.status) {
        case 0:
        case 1:
          return "tab-header pending";
        case 2:
        case 3:
          return "tab-header received";
        case 4:
        case 5:
          return "tab-header validated";
        case 9:
          return "tab-header cancelled"
      }
      return "tab-header"
    }

    $scope.showNote = function(comment) {
      console.log("note: "+comment);
      $scope.title = "Observaciones";
      $scope.comment = comment;

      ModalService.showModal({
        templateUrl:"views/showNote.html",
        controller: "ShowNoteCtrl",
        inputs: {
          comment: $scope.comment,
          title: $scope.title
        }

      }).then(function(modal) {
        modal.element.modal();

      })
    }


  }]);
