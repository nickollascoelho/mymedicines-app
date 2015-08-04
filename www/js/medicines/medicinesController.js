(function() {
  'use strict';

  angular
    .module('myMedicines')
    .controller('MedicinesController', MedicinesController);

    MedicinesController.$inject = ['$scope', '$state', 'AuthService'];

    function MedicinesController($scope, $state, AuthService) {
      $scope.user = AuthService.user();
      $scope.teste = function(medicineId) {
        $state.go('medicines.detail', {
          userId: $scope.user.id,
          medicineId: medicineId
        }, {reload: true});

      }
    }

}());
