namespace app {
  'use strict';
  
  angular.module('app', [
    'app.core',
    'app.auth',
    'app.accounts',
    'LocalStorageModule'
  ]);
}