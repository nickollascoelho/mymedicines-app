(function() {
  'use strict';

  angular
    .module('myMedicines')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'AuthService'];

    function SignUpController($scope, AuthService) {
      var vm = this;

      vm.newUser = {
        name: '',
        password: '',
        confirmPassword: ''
      }

      vm.signup = function(isValid) {
        if (!isValid) return;
        AuthService.signup(vm.newUser);
      }
    }

}());
