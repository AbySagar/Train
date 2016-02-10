'use strict';
angular
  .module('customers')
  .controller('CustomersUpdateController', ['$scope', '$state','$log',
    function ($scope, $state,$log) {
      var vm = this;

      vm.customer = $scope.customer;

      vm.error = null;
      vm.form = {};
      //
      vm.save = save;

      // Save Customer
      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.customerForm');
          return false;
        }


        //vm.customer.$update(function (response) {
        //
        //  Notify.sendMsg('UpdatedCustomer', { 'id': response._id });
        //
        //}, function (errorResponse) {
        //  $scope.error = errorResponse.data.message;
        //});


        // TODO: move create/update logic to service
        // if (vm.customer._id) {

        vm.customer.$update(successCallback, errorCallback);
        $log.info(vm.customer.firstName);
        //} else {
        //  vm.customer.$save(successCallback, errorCallback);
        // }

        function successCallback(res) {
          $state.go('customers.view', {
            customerId: res._id
          });
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }
    }
  ]);
