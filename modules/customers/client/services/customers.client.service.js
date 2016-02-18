(function () {
  'use strict';

  angular
    .module('customers.services')
    .factory('CustomersService', CustomersService);

  CustomersService.$inject = ['$resource'];

  function CustomersService($resource) {
    return $resource('api/customers/:customerId', {
      customerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();


(function () {
  'use strict';

  angular
    .module('customers.services')
    .factory('Notify', Notify);

  Notify.$inject = ['$rootScope'];

  function Notify($rootScope) {

    var notify={};
    notify.sendMsg=function(msg, data){
      data=data||{};
      $rootScope.$emit(msg,data);
      console.log('message sent');
    };
    notify.getMsg=function(msg,func, scope){
      var unbind=$rootScope.$on(msg,func);
      if(scope){
        scope.$on('destroy',unbind);
      }
    };
    return notify;

  }
})();
