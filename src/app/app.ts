namespace app {
  'use strict';
  
  angular.module('app', [
    'app.core',
    'app.data',
    'app.auth',
    'app.layout',
    'app.accounts',
    'app.claims',
    'app.config',
    'app.home',
    'app.inventory',
    'app.reports',
    'app.toastrLogging',
    'ngMaterial',
    'ngMessages'
  ]);
}