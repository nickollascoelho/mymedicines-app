(function() {
  'use strict'

  angular
    .module('myMedicines')
    .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$log', '$q', '$rootScope', 'LocalService', 'ENDPOINT', 'AUTH_EVENTS'];

    function AuthService($http, $log, $q, $rootScope, LocalService, ENDPOINT, AUTH_EVENTS) {
      const LOCAL_TOKEN_KEY = 'AUTH_TOKEN';
      const LOCAL_USER_KEY = 'AUTH_USER';

      var user = {},
          authService = {},
          isAuthenticated = false,
          authToken;

      function loadUserCredentials() {
        authToken = LocalService.get(LOCAL_TOKEN_KEY);
        if (authToken) {
          user = JSON.parse(LocalService.get(LOCAL_USER_KEY, user));
          isAuthenticated = true;

          $http.defaults.headers.token = 'Bearer ' + authToken;
        }
      }

      function storeUserCredentials(credentials) {
        authToken = credentials.token;
        user = credentials.user;
        isAuthenticated = true;
        LocalService.set(LOCAL_USER_KEY, JSON.stringify(user))  ;
        LocalService.set(LOCAL_TOKEN_KEY, authToken);
        $http.defaults.headers.token = 'Bearer ' + authToken;
      }

      function destroyCredentials() {
        isAuthenticated = false;
        authToken = undefined;
        user = {};
        $http.defaults.headers.token = undefined;
        LocalService.delete(LOCAL_TOKEN_KEY);
        LocalService.delete(LOCAL_USER_KEY);
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      }

      loadUserCredentials();

      authService.login = function(credentials) {
        $http.post(ENDPOINT.authUrl, credentials)
        .success(function(credentials) {
          storeUserCredentials(credentials);
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }).error(function(error, code) {
          $log.error(error, code);
        });
      }

      authService.signup = function(newUser) {
        $http.post(ENDPOINT.usersUrl, newUser)
        .success(function(credentials) {
          storeUserCredentials(credentials);
          $rootScope.$broadcast(AUTH_EVENTS.signUpSuccess);
        }).error(function(error, code) {
          $log.error(error, code);
        });
      };

      authService.logout = function() {
        destroyCredentials();
      };

      authService.user = function() {
        return user;
      };

      authService.isAuthenticated = function() {
        return isAuthenticated;
      };

      return authService;
    }

})();
