(function() {
  'use strict';

  angular
    .module('myMedicines')
    .factory('LocalService', LocalService);

    function LocalService() {
      return {
        get: function(key) {
          return localStorage.getItem(key);
        },
        set: function(key, val) {
          return localStorage.setItem(key, val);
        },
        delete: function(key) {
          return localStorage.removeItem(key);
        }
      }
    }

}());
