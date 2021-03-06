(function () {
  'use strict';

  angular
    .module('customers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Customers',
      state: 'customers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'customers', {
      title: 'List Customers',
      state: 'customers.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'customers', {
      title: 'Create Customers',
      state: 'customers.create',
      roles: ['user']
    });
  }
})();
