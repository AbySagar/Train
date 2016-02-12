'use strict';
angular
  .module('customers')
  .controller('CustomersCreateController', ['$scope', '$state','$log','Notify',
    function ($scope, $state,$log,Notify) {
      var vm = this;

      vm.customer = $scope.customer;
      vm.ok=$scope.ok;

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

        vm.customer.$save(successCallback, errorCallback);
        $log.info(vm.customer.firstName);
        $scope.error=vm.error;

        //} else {
        //  vm.customer.$save(successCallback, errorCallback);
        // }

        function successCallback(res) {
          Notify.sendMsg("NewCustomer",{ 'id':res._id });
          //$state.go('customers.list');
        }

        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }
    }
  ]);
