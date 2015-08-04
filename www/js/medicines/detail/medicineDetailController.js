(function() {
  'use strict';

  angular
    .module('myMedicines')
    .controller('MedicineDetailController', MedicineDetailController);

    MedicineDetailController.$inject = ['$scope', '$stateParams', 'AuthService'];

    function MedicineDetailController($scope, $stateParams, AuthService) {
      var medicines = AuthService.user().medicines;
      var id = $stateParams.medicineId;
      var i = medicines.length - 1;

      while(!$scope.medicine && i >= 0) {
        if (medicines[i].id === id) {
          $scope.medicine = medicines[i];
        }
        i--;
      }
    }

}());
