(function() {
  'use strict'

  angular
    .module('myMedicines', ['ionic', 'ngMessages'])
    .controller('MyMedicinesController', MyMedicinesController)
    .run(function($ionicPlatform, $ionicPopup, $rootScope, $state, AuthService, AUTH_EVENTS) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        if(window.StatusBar) StatusBar.styleDefault();
      });

      $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if (!AuthService.isAuthenticated() && next.name !== 'login' && next.name !== 'signup') {
          event.preventDefault();
          $state.go('login');
        }
      });

      $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event, msg) {
        AuthService.logout();
        $state.go('login');
        var alertPopup = $ionicPopup.alert({
          title: 'Ocorreu um erro.',
          template: (msg ? msg.err : '')
        });
      });

      $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Falha no login.',
          template: (msg ? msg.err : '')
        });
      });

      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
        $state.go('login');
      });

      var goToMedicines = function() {
        $state.go('medicines', { userId: AuthService.user().id }, {reload: true});
      }
      $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event) {
        goToMedicines();
      });

      $rootScope.$on(AUTH_EVENTS.signUpSuccess, function(event) {
        goToMedicines();
      });

    });

    MyMedicinesController.$inject = ['$scope', 'AuthService'];

    function MyMedicinesController($scope, AuthService) {
      var vm = this;

      vm.logout = function() {
        AuthService.logout();
      };

    }

})();
