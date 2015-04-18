'use strict';

/**
 * @ngdoc service
 * @name microApp.slF
 * @description
 * # slF
 * Factory in the microApp.
 */

var sl_server='http://192.168.99.97';

angular.module('microApp', ['ngResource'])
  .factory('slF', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return $resource(sl_server+'/wksanal/get_sample/?post={"sampleidee":"N002704", "mode":1}', {},
        {
            get: {method:"JSONP", params:{}, callback:'JSON_CALLBACK'}

        }
    );
  });
