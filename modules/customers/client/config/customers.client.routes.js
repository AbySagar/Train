(function () {
  'use strict';

  angular
    .module('customers.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('customers', {
        abstract: true,
        url: '/customers',
        template: '<ui-view/>'
      })
      .state('customers.list', {
        url: '',
        templateUrl: 'modules/customers/client/views/list-customers.client.view.html',
        controller: 'CustomersListController',
        controllerAs: 'CLCtrl'
      })
      .state('customers.create', {
        url: '/create',
        templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
        controller: 'CustomersController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: newCustomer
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('customers.edit', {
        url: '/:customerId/edit',
        templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
        controller: 'CustomersController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getCustomer
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('customers.view', {
        url: '/:customerId',
        templateUrl: 'modules/customers/client/views/view-customer.client.view.html',
        controller: 'CustomersController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getCustomer
        }
      });
  }

  getCustomer.$inject = ['$stateParams', 'CustomersService'];

  function getCustomer($stateParams, CustomersService) {
    return CustomersService.get({
      customerId: $stateParams.customerId
    }).$promise;
  }

  newCustomer.$inject = ['CustomersService'];

  function newCustomer(CustomersService) {
    return new CustomersService();
  }
})();
