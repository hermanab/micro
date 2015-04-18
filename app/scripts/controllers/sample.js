'use strict';

/**
 * @ngdoc function
 * @name microApp.controller:SampleCtrl
 * @description
 * # SampleCtrl
 * Controller of the microApp
 */
// var sl_server_l='http://192.168.99.97:19010';

angular.module('microApp')
  .controller('SampleCtrl', ['$scope', '$state', '$http', '$stateParams', '$location', '$anchorScroll', 'hotkeys','ModalService', 'focus', 'sl_server',
    function ($scope, $state, $http, $stateParams, $location, $anchorScroll, hotkeys, ModalService, focus, sl_server) {
      var sampleidee=$stateParams.sampleidee;
      $scope.user = $stateParams.user;
      var url=sl_server+'/wksanal/get_sample/?post={"sampleidee":"$sampleidee", "mode":1}';
      url=url.replace("$server", sl_server);
      url=url.replace("$sampleidee", sampleidee);


      $scope.test_results={};
      $scope.testsChanged=[];

      console.log(url);
      $http.get(url)
          .success(function(data) {
              $scope.sample=data.data;
              $scope.selected_test=null;
              $scope.seleted_isolation=null;
              $scope.selected_atb=null;
              var ntests=$scope.sample.tests.length;
              for (var t=0; t < ntests; t++) {
                var testcode=$scope.sample.tests[t].testid.code;
                $scope.load_test_results(testcode);
              }
              $scope.select_test($scope.sample.tests[0]);

          }
      );

      $scope.save = function() {
        url=sl_server+'/exec/wksanal_sample_save/?post={"work_sess_user":"$user"}';
        url=url.replace("$user", $scope.user);
        console.log(url);

        $http.post(url, $scope.sample)
          .success(function(data) {

          })

      };

      $scope.$on("$stateChangeStart", function(event) {
        var changed=false;
        for (var i=0; i < $scope.sample.tests.length; i++) {
          if ($scope.sample.tests[i].changed) {
            console.log($scope.sample.idee+"."+$scope.sample.tests[i].testid.code+" changed");
            changed=true;
          }
        }
        if (changed) {
          $scope.save();
        }
      });

      $scope.load_test_dicresults = function() {
      var url = sl_server+'/wksanal/test_dicresults/';
      $http.get(url)
        .success(function (data) {
          $scope.test_dicresults = data.data;
        }
      );
    }

    $scope.load_cfus = function() {
      var url = sl_server+'/wksanal/load_cfus/';
      $http.get(url)
        .success(function (data) {
          $scope.cfus = data.data;
        }
      );
    }

    $scope.load_resistences = function() {
      var url = sl_server+'/wksanal/load_resistences/';
      $http.get(url)
        .success(function (data) {
          $scope.resistences = data.data;
        }
      );
    }

    $scope.load_atbpanels = function() {
      var url = sl_server+'/wksanal/load_atbpanels/';
      $http.get(url)
        .success(function (data) {
          $scope.panels = data.data;
          console.log("Panels:");
          console.log($scope.panels);
        }
      );
    }

    $scope.load_table = function(api_table, table_data) {
      var url = sl_server+'/wksanal/$api$/';
      url=url.replace("$api$", api_table);
      $http.get(url)
        .success(function (data) {
          table_data = data.data;
        }
      );
    }

    $scope.load_test_dicresults();
    $scope.load_cfus();
    $scope.load_resistences();
    $scope.load_atbpanels();

    hotkeys.bindTo($scope)
      .add({
        combo: 'r',
        description: 'Set ATB resistence',
        callback: function() {
          $scope.change_atb_sens2("R");
          $scope.next_atb();
        }
      })
      .add({
        combo: 's',
        description: 'Set ATB sensible',
        callback: function() {
          $scope.change_atb_sens2("S");
          $scope.next_atb();
        }
        })
      .add({
        combo: 'i',
        description: 'Set ATB indetermined',
        callback: function() {
          $scope.change_atb_sens2("I");
          $scope.next_atb();
        }
      })
      .add({
        combo: 'd',
        description: 'Set ATB resistence SDD',
        callback: function() {
          $scope.change_atb_sens2("SDD");
          $scope.next_atb();
        }
      })
      .add({
        combo: '-',
        description: 'Remove ATB resistence',
        callback: function() {
          $scope.change_atb_sens2("");
          $scope.next_atb();
        }
      })
      .add({
        combo: 'p',
        description: 'Set ATB report',
        callback: function() {
          $scope.change_atb_report2();
        }
      })
      .add({
          combo: 'shift+up',
          description: 'Previous ATB',
          callback: function() {
            $scope.prev_atb();
            return false;
          }
        })
      .add({
        combo: 'shift+down',
        description: 'Next ATB',
        callback: function() {
          $scope.next_atb();
          return false;
        }
      })
      .add({
        combo: 'ctrl+down',
        description: 'Test siguiente',
        callback: function() {
          $scope.nextTest();
          return false;
        }
      })
      .add({
        combo: 'ctrl+up',
        description: 'Test anterior',
        callback: function() {
          $scope.prevTest();
          return false;
        }
      })
      .add({
        combo: 'alt+down',
        description: 'Organismo siguiente',
        callback: function() {
          $scope.nextIsolation();
          return false;
        }
      })
      .add({
        combo: 'alt+up',
        description: 'Ogamismo anterior',
        callback: function() {
          $scope.prevIsolation();
          return false;
        }
      })
      .add({
        combo: 'shift+right',
        description: 'Abrir ATB',
        callback: function() {
          $scope.expandATB();
          return false;
        }
      })
      .add({
        combo: 'shift+left',
        description: 'Cerrar ATB',
        callback: function() {
          $scope.collapseATB();
          return false;
        }
      });

    $scope.change_atb_sens = function(atb) {
      console.log(atb);
      switch (atb.sens) {
        case 'S':
              atb.sens='R';
              break;
        case 'R':
              atb.sens='I';
              break;
        case 'I':
              atb.sens='SDD';
              break;
        default:
              atb.sens='S';
              break;
      }
      $scope.selected_test.changed = true;
      $scope.selected_isolation.changed = true;
    }

    $scope.change_atb_sens2 = function(sens) {
      $scope.selected_atb.sens=sens;
      $scope.selected_test.changed = true;
      $scope.selected_isolation.changed = true;
    }

    $scope.change_atb_report = function(atb) {
      atb.report=!atb.report;
      $scope.selected_test.changed = true;
      $scope.selected_isolation.changed = true;
    }

    $scope.change_atb_report2 = function() {
      $scope.selected_atb.report=!$scope.selected_atb.report;
      $scope.selected_test.changed = true;
      $scope.selected_isolation.changed = true;
    }

    $scope.atb_report = function(atb) {
      if (atb.report) return "glyphicon glyphicon-print";
      else return "glyphicon glyphicon-unchecked";
    }

    $scope.testStatus = function(test) {
      switch (test.status) {
        case 1: return "test-ordered";
        case 2: return "test-received";
        case 3: return "test-received";
        case 4: return "test-validated";
        case 5: return "test-validated";
        case 9: return "test-canceled";
      }
    }

    $scope.testStatusImage = function(test) {
      switch (test.status) {
        case 1: return "images/ORDERED.png";
        case 2: return "images/RECEIVED.png";
        case 3: return "images/RECEIVED.png";
        case 4: return "images/VALIDATED.png";
        case 5: return "images/VALIDATED.png";
        case 9: return "images/CANCELLED.png";
      }
    }

    $scope.select_atb = function(atb) {
      if ($scope.selected_atb == null) {
        atb.selected=true;
        $scope.selected_atb=atb;
        return;
      }
      Array.prototype.forEach.call($scope.selected_isolation.atbs, function(atb) {
        atb.selected=false;
      });
      atb.selected=true;
      $scope.selected_atb=atb;
    }

    $scope.select_isolation = function(isolation) {
      console.log("select_isolation "+isolation.specimen.code);
      if ($scope.selected_isolation == null) {
        isolation.selected=true;
        $scope.selected_isolation=isolation;
        return;
      }
      if (isolation.id == $scope.selected_isolation.id) {
        return;
      }
      Array.prototype.forEach.call($scope.selected_test.isolations, function(iso) {
        iso.selected=false;
      });
      isolation.selected=true;
      $scope.selected_isolation=isolation;
      if ($scope.selected_atb != null) {
        $scope.selected_atb.selected=false;
        $scope.selected_atb = null;
      }
    }

    $scope.select_test = function(test) {
      console.log("select_test "+test.testid.code);
      if ($scope.selected_test == null) {
        test.selected=true;
        $scope.selected_test=test;
        return;
      }
      if (test.id == $scope.selected_test.id) {
        return;
      }
      Array.prototype.forEach.call($scope.sample.tests, function(ltest) {
        ltest.selected=false;
      });
      test.selected=true;
      $scope.selected_test=test;
      if ($scope.selected_isolation != null) {
        $scope.selected_isolation.selected=false;
        $scope.selected_isolation = null;
      }
      if ($scope.selected_atb != null) {
        $scope.selected_atb.selected=false;
        $scope.selected_atb = null;
      }

      var testElement=$("#test-"+$scope.selected_test.testid.code+"-name");
      if (!testElement.visible()) {
        var old=$location.hash();
        $location.hash("test-"+$scope.selected_test.testid.code+"-name");
        $anchorScroll(300);
        $location.hash(old);
      }

    };

    $scope.nextTest = function() {
      if ($scope.selected_test == null) {
        $scope.select_test($scope.sample.tests[0]);
        return;
      }
      for (var i=0; i < $scope.sample.tests.length; i++) {
        if ($scope.selected_test.id == $scope.sample.tests[i].id) {
          $scope.select_test($scope.sample.tests[i+1]);
          return;
        }
      }
    }

    $scope.prevTest = function() {
      if ($scope.selected_test == null) {
        return;
      }
      for (var i=$scope.sample.tests.length-1; i >= 1; i--) {
        if ($scope.selected_test.id == $scope.sample.tests[i].id) {
          $scope.select_test($scope.sample.tests[i-1]);
          return;
        }
      }
    }

    $scope.nextIsolation = function() {
      var isos=$scope.selected_test.isolations;
      if (isos.length == 0) return;
      if ($scope.selected_isolation == null) {
        $scope.select_isolation(isos[0]);
        return;
      }
      for (var i=0; i < isos.length; i++) {
        if ($scope.selected_isolation.id == isos[i].id) {
          $scope.select_isolation(isos[i+1]);
          return;
        }
      }
    }

    $scope.prevIsolation = function() {
      var isos=$scope.selected_test.isolations;
      if (isos.length == 0) return;
      if ($scope.selected_isolation == null) {
        return;
      }
      for (var i=isos.length-1; i >= 1; i--) {
        if ($scope.selected_isolation.id == isos[i].id) {
          $scope.select_isolation(isos[i-1]);
          return;
        }
      }
    }


    $scope.atb_keyup = function(atb, event) {
      console.log(event.keyCode);
    };

    $scope.next_atb = function() {
      if ($scope.selected_isolation == null) return;
      if ($scope.selected_atb == null) {
        $scope.select_atb($scope.selected_isolation.atbs[0]);
        return;
      }
      for (var i=0; i < $scope.selected_isolation.atbs.length-1; i++) {
        var atb=$scope.selected_isolation.atbs[i];
        if (atb.id == $scope.selected_atb.id) {
          $scope.select_atb($scope.selected_isolation.atbs[i+1]);
          break;
        }
      }

    };

    $scope.prev_atb = function() {
      if ($scope.selected_isolation == null) return;
      if ($scope.selected_atb == null) {
        $scope.select_atb($scope.selected_isolation.atbs[$scope.selected_isolation.atbs.length-1]);
        return;
      }
      for (var i=$scope.selected_isolation.atbs.length-1; i >= 1; i--) {
        var atb=$scope.selected_isolation.atbs[i];
        if (atb.id == $scope.selected_atb.id) {
          $scope.select_atb($scope.selected_isolation.atbs[i-1]);
          break;
        }
      }
    };

    $scope.selSpecimen = function() {
      ModalService.showModal({
        templateUrl:"views/selSpecimen.html",
        controller: "SpecimenCtrl"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.specimen = result;
          if (result) {
            $scope.addIsolation(result);
          }
        });
      });
    }

    $scope.addIsolation = function(spename) {
      var url=sl_server+'/wksanal/load_specimen/?post={"specimen":"$specimen$"}';
      url=url.replace("$specimen$", spename);
      console.log(url);
      $http.get(url).success(function(result) {
        var spe=result.data;
        var idx=-$scope.selected_test.isolations.length-1;
        var iso_ins={specimen:spe, recurrent:false, resistance:null, comments:"", ufc:"", id:idx, atbs:[], histo:[]};
        $scope.selected_test.isolations.push(iso_ins);
      });
    }

    $scope.isolationExpanded = function(isolation) {
      if (isolation.expanded == undefined) return true;
      return isolation.expanded;
    }

    $scope.isolationExpandedClass = function(isolation) {
      if (isolation.expanded == undefined) return "glyphicon glyphicon-triangle-bottom";
      if (isolation.expanded) return "glyphicon glyphicon-triangle-bottom";
      return "glyphicon glyphicon-triangle-right";
    }

    $scope.isolationHisto = function(isolation) {
      if (isolation.histo.length > 1) return true;
      return false;
    }

    $scope.toggleIsolation = function(isolation) {
      if (isolation.expanded == undefined) isolation.expanded=true;
      isolation.expanded=!isolation.expanded;
    }

    $scope.expandATB = function() {
      $scope.selected_isolation.expanded=true;
    }

    $scope.collapseATB = function() {
      $scope.selected_isolation.expanded=false;
    }

    $scope.load_test_results = function(testcode) {
      var url = sl_server+'/wksanal/test_results/?post={"testcode":"$testcode"}';
      url = url.replace("$testcode", testcode);
      $http.get(url)
        .success(function (data) {
          $scope.test_results[testcode] = data.data;
        }
      );
    }

    $scope.selPanelATB = function() {
      ModalService.showModal({
        templateUrl:"views/selPanelATB.html",
        controller: "PanelATBsCtrl"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.panelATB = result;
          if (result) {
            $scope.addPanelATB(result);
          }
        });
      });
    }

    $scope.addPanelATB = function(panel) {
      console.log("add panel "+panel);
      var url=sl_server+'/wksanal/load_atbpanel/?post={"panel":"$panelcode$"}';
      url=url.replace("$panelcode$", panel);
      url=url.replace(" ", "%20");
      $http.get(url)
        .success(function(data) {
          var atbs=data.data;
          console.log(atbs);
          var len=atbs.length;
          for (var i=0; i < len; i++) {
            var atb_ins={atb:atbs[i], pos:i+1, sens:"-", report:true, id:-i};
            console.log(atb_ins);
            $scope.selected_isolation.atbs.push(atb_ins);
          }
          console.log($scope.selected_isolation);
        })
    }

    $scope.selATB = function() {
      ModalService.showModal({
        templateUrl:"views/selATB.html",
        controller: "ATBsCtrl"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.atb = result;
          if (result) {
            $scope.addATB(result);
          }
        });
      });
    }

    $scope.addATB = function(atb) {
      console.log("add ATB "+atb);
      var url=sl_server+'/wksanal/load_atb/?post={"atb":"$atbcode$"}';
      url=url.replace("$atbcode$", atb);
      url=url.replace(" ", "%20");
      $http.get(url)
        .success(function(data) {
          var atb=data.data;
          console.log(atb);
          var atb_ins={atb:atb, pos:1, sens:"-", report:true, id:-1};
          console.log(atb_ins);
          $scope.selected_isolation.atbs.push(atb_ins);
        })
    }

    $scope.addPredefinedText = function() {
      $scope.ptexts=$scope.test_results[$scope.selected_test.testid.code];
      ModalService.showModal({
        templateUrl:"views/selPredefinedTexts.html",
        controller: "PredefinedTextsCtrl",
        inputs: {
          testcode: $scope.selected_test.testid.code,
          ptexts: $scope.ptexts
        }

      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result != '$cancel$') {
            $scope.selected_test.valuetxt=$scope.selected_test.valuetxt.substring(0, $scope.selected_test.valuetxt.length-1);
            $scope.selected_test.valuetxt += result;
            focus("input-"+$scope.selected_test.testid.code);
          }
        });
      });
    }

    $scope.addTestComment = function() {
      console.log("addTestComment");

      $scope.ptexts=$scope.test_results[$scope.selected_test.testid.code];
      ModalService.showModal({
        templateUrl:"views/testComment.html",
        controller: "TestCommentCtrl",
        inputs: {
          comment: $scope.selected_test.comments,
          ptexts: $scope.ptexts
        }

      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result != '$cancel$') {
            $scope.selected_test.comments=result;
            console.log("com: "+result);
            focus("comment-"+$scope.selected_test.testid.code);
          }
        });
      });
    }

    $scope.isolationHistory = function() {
      $scope.showIsolationHisto($scope.selected_isolation);
    };

    $scope.showIsolationHisto = function(isolation) {
      console.log("isolationHisto");

      ModalService.showModal({
        templateUrl:"views/isolation-histo.html",
        controller: "IsolationHistoCtrl",

        inputs: {
          isoid: isolation.id,
          isolation: isolation
        }

      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
        });
      });
    }


    $scope.getTest = function(testcode) {
      for (var i=0; i < $scope.sample.tests.length; i++) {
        if (testcode == $scope.sample.tests[i].testid.code) {
          return $scope.sample.tests[i];
        }
      }
      return null;
    }

    $scope.getSelectedTest = function() {
      return $scope.getTest($scope.selected_test.testid.code);
    }

    $scope.autoExpand = function(test, e) {
      if ($scope.test_readonly(test)) return;
      if (e.charCode == 63) {
        $scope.addPredefinedText();
        return;
      }
      var element = typeof e === 'object' ? e.target : document.getElementById(e);
      var scrollHeight = element.scrollHeight -2; // replace 60 by the sum of padding-top and padding-bottom
      if (scrollHeight < 36) scrollHeight=36;
      element.style.height =  scrollHeight + "px";
    };

    $scope.test_readonly = function(test) {
      if (test.status > 3) return true;
      if (!test.selected) return true;
      return false;
    }

    $scope.isolation_readonly = function(test, isolation) {
      if (test.status > 3) return true;
      if (!isolation.selected) return true;
      return false;
    }

    $scope.unvalidateTest = function() {
      var test=$scope.getSelectedTest();
      console.log(test);
      if (!test) return;
      if (test.status == 4 || test.status == 5) {
        test.status=3;
      }
    }

    $scope.validateTest = function() {
      var test=$scope.getSelectedTest();
      if (!test) return;
      if (test.status == 3) {
        test.status=4;
      }
    }

    $scope.rerunTest = function() {
      var test=$scope.getSelectedTest();
      if (!test) return;
      test.status=1;
      test.valueq='';
      test.valuetxt=''
    }

    $scope.cancelTest = function() {
      var test=$scope.getSelectedTest();
      if (!test) return;
      test.status=9;
    }

    $scope.doNothing = function() {

    }
  }]);
