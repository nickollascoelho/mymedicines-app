(function() {
  'use strict'

  angular
    .module('myMedicines')
    .config(RouteProvider);

    RouteProvider.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RouteProvider($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController as vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpController as vm'
      })
      .state('tabs', {
        url: '/',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('medicines', {
        url: 'user/:userId/medicines',
        parent: 'tabs',
        views: {
          'home-tab': {
            templateUrl: 'templates/medicines.html',
            controller: 'MedicinesController as vm'
          }
        }
      })
      .state('medicines.detail', {
        url: '/:medicineId',
        views: {
          'home-tab@tabs': {
            templateUrl: 'templates/medicine-detail.html',
            controller: 'MedicineDetailController as vm'
          }
        }
      });

      $urlRouterProvider.otherwise('/login');
    }

})();
