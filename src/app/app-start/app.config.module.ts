namespace app {
  'use strict';
  
  angular.module('app.config', [
    'app.core',
    'app.auth',
    'app.globalErrorDecorator',
    'ngMaterial'
  ]);
}