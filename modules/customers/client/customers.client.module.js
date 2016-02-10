(function (app) {
  'use strict';

  app.registerModule('customers');
  app.registerModule('customers.services');
  app.registerModule('customers.routes', ['ui.router', 'customers.services']);
})(ApplicationConfiguration);
