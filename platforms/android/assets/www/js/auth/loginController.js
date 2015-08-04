(function() {
  'use strict'

  angular
    .module('myMedicines')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS'];

    function LoginController($scope, $rootScope, AuthService, AUTH_EVENTS) {
      if (AuthService.isAuthenticated()) {
        $rootScope.$emit(AUTH_EVENTS.loginSuccess);
      }

      var vm = this;

      vm.credentials = {
        name: '',
        password: ''
      }

      vm.login = function(isValid) {
        if (!isValid) return;
        AuthService.login(vm.credentials);
      }
    }

})();
