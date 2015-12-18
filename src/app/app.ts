namespace app {
  'use strict';
  
  angular.module('app', [
    'app.core',
    'app.auth',
    'app.layout',
    'app.accounts',
    'app.config',
    'app.home',
    'app.inventory',
    'app.reports',
    'app.settings',
    'app.toastrLogging'
  ]);
}