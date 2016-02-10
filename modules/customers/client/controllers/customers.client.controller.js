(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersController', CustomersController);


  CustomersController.$inject = ['$scope', '$state', 'customerResolve', 'Authentication','$modal','$log'];

  function CustomersController($scope, $state, customer, Authentication,$modal,$log) {
    var vm = this;

    vm.customer = customer;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.modalUpdate=modalUpdate;

    // Remove existing Customer
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.customer.$remove($state.go('customers.list'));
      }
    }

    function modalUpdate(size) {

      var modalInstance = $modal.open({
        //animation: $scope.animationsEnabled,
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
        controller: 'modalInstanceCtrl',

        //controllerAs:vm,
        size: size,
        resolve: {
          customer: function () {
            return vm.customer;
          }
        }
      });

      modalInstance.result.then(function (customer) {
        // $scope.selected = selectedItem;
      }, function () {
        $log.info('modal dismissed at: ' + new Date());
      });
    }
    // Save Customer
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.customerForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.customer._id) {
        vm.customer.$update(successCallback, errorCallback);
      } else {
        vm.customer.$save(successCallback, errorCallback);
      }

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


  angular
    .module('customers')
    .controller('modalInstanceCtrl', modalInstanceCtrl);

  modalInstanceCtrl.$inject = ['$scope','$modalInstance', 'customer' ];
  function modalInstanceCtrl($scope, $modalInstance, customer) {
    $scope.customer = customer;
    $scope.ok = function () {
      $modalInstance.close($scope.customer);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


    // $scope.remove = remove;


  }

})();


//(function () {
//  'use strict';
//
//  angular
//    .module('customers')
//    .controller('CustomersController', CustomersController);
//

//
//  CustomersController.$inject = ['$scope', '$state', 'customerResolve', 'Authentication','$modal','$log'];
//
//  function CustomersController($scope, $state,customer, Authentication,$modal, $log) {
//    var vm1 = this;
//
//    vm1.customer = customer;
//    vm1.authentication = Authentication;
//    vm1.error = null;
//    vm1.form = {};
//    vm1.remove = remove;
//    vm1.save = save;
//
//    // Remove existing Customer
//    function remove() {
//      if (confirm('Are you sure you want to delete?')) {
//        vm1.customer.$remove($state.go('customers.list'));
//      }
//    }
//

//


//
//     //Save Customer
//    function save(isValid) {
//      if (!isValid) {
//        $scope.$broadcast('show-errors-check-validity', 'vm1.form.customerForm');
//        return false;
//      }
//
//      // TODO: move create/update logic to service
//      if (vm1.customer._id) {
//        $scope.customer.$update(successCallback, errorCallback);
//      } else {
//        vm1.customer.$save(successCallback, errorCallback);
//      }
//
//      function successCallback(res) {
//        $state.go('customers.view', {
//          customerId: res._id
//        });
//      }
//
//      function errorCallback(res) {
//        vm1.error = res.data.message;
//      }
//    }
//  }


//})();
