(function() {
  'use strict';

  angular
    .module('myMedicines')
    .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];

    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
      return {
          responseError: function (response) {
            var event = {
              401: AUTH_EVENTS.notAuthenticated,
              403: AUTH_EVENTS.invalidToken,
              419: AUTH_EVENTS.sessionTimeout,
              440: AUTH_EVENTS.sessionTimeout
            }[response.status];
            $rootScope.$emit(event, response.data);
            return $q.reject(response);
          }
        };
    }

}());
