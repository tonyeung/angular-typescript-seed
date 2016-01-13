namespace app {
  'use strict';

  angular
    .module('app.config')
    .run(debugEvents);

  function debugEvents($rootScope, DEBUG_ROUTER) {

    if (DEBUG_ROUTER) {

      $rootScope
        .$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
          console.log("State Change: transition begins!");
          console.log(event);
          console.log(toState);
          console.log(toParams);
          console.log(fromState);
          console.log(fromParams);
        });

      $rootScope
        .$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
          console.log("State Change: State change success!");
          console.log(event);
          console.log(toState);
          console.log(toParams);
          console.log(fromState);
          console.log(fromParams);
        });

      $rootScope
        .$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams) {
          console.log("State Change: Error!");
          console.log(event);
          console.log(toState);
          console.log(toParams);
          console.log(fromState);
          console.log(fromParams);
        });

      $rootScope
        .$on('$stateNotFound',
        function(event, toState, toParams, fromState, fromParams) {
          console.log("State Change: State not found!");
          console.log(event);
          console.log(toState);
          console.log(toParams);
          console.log(fromState);
          console.log(fromParams);
        });

      $rootScope
        .$on('$viewContentLoading',
        function(event, viewConfig) {
          console.log("View Load: the view is loaded, and DOM rendered!");
          console.log(event);
          console.log(viewConfig);
        });

      $rootScope
        .$on('$viewcontentLoaded',
        function(event, viewConfig) {
          console.log("View Load: the view is loaded, and DOM rendered!");
          console.log(event);
          console.log(viewConfig);
        });

    }

  }

}