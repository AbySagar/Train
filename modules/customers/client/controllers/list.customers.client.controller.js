(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = [ 'Authentication','$modal','$log','CustomersService'];

  function CustomersListController(Authentication,$modal,$log,CustomersService) {


    var vm = this;

    vm.customers = CustomersService.query();


    vm.authentication = Authentication;




    vm.modalCreate=modalCreate;

    function modalCreate(size) {

      var modalInstance = $modal.open({
        //animation: $scope.animationsEnabled,
        templateUrl: 'modules/customers/client/views/create-customer.client.view.html',
        controller: 'modalInstanceCtrl2',

        //controllerAs:vm,
        size: size,
        resolve: {
          customer: function () {
            return new CustomersService();
          }
        }
      });

      modalInstance.result.then(function (customer) {
        // $scope.selected = selectedItem;
      }, function () {
        $log.info('modal dismissed at: ' + new Date());
      });
    }

  }

  angular
    .module('customers')
    .controller('modalInstanceCtrl2', modalInstanceCtrl2);

  modalInstanceCtrl2.$inject = ['$scope','$modalInstance','customer' ];
  function modalInstanceCtrl2($scope, $modalInstance,customer) {
    $scope.customer = customer;
    $scope.ok = function () {
      //if(!$scope.error)
      $modalInstance.close($scope.customer);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };


    // $scope.remove = remove;


  }



  angular.module('customers').directive('customerList', ['CustomersService', 'Notify',function(CustomersService,Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/customers/client/views/customer-list-temp.html',
      link: function(scope, element, attrs){
        //update customer list when a new customer added
        Notify.getMsg("NewCustomer",function(event,data){
          //here we should use the controlleras CLCtrl in rout.js to refer customers, if we use controller name
          //CustomersListController, it won't work.
          scope.CLCtrl.customers= CustomersService.query();
        });

      }
    };
  }]);
})();
