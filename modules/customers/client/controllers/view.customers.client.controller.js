(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersViewController', CustomersViewController);

  CustomersViewController.$inject = ['$scope', '$state', '$uibModal', '$log', 'customerResolve', 'Authentication'];

  function CustomersViewController($scope, $state, $uibModal, $log, customer, Authentication) {
    var vm = this;

    vm.customer = customer;
    vm.authentication = Authentication;

    $scope.modalUpdate = function (size) {

      var modalInstance = $uibModal.open({
        //animation: $scope.animationsEnabled,
        templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
        controller: function ($scope, $uibModalInstance, customer) {

          $scope.customer = customer;
        },
        size: size,
        resolve: {
          customer: function () {
            return $scope.customer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();
