namespace app {
  'use strict';
  angular.module('app')
		.run(Authorization);

  function Authorization($rootScope, $state, $stateParams, AuthenticationManagerFactory, AuthorizationManagerFactory) {
    $rootScope.$on('$stateChangeStart', checkClaims);

    function checkClaims(event, toState, toStateParams) {      
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (toState.data.public) {
        return;
      }

      var authenticationManager = AuthenticationManagerFactory();
      if (!authenticationManager.getIsAuthenticated()) {
        $state.go('login', {});
        return;
      }
              
      // need to stick some data into the authorize method
      var authorizationManager = AuthorizationManagerFactory();
      if (!authorizationManager.authorize()) {
        $state.go('no access', {});
        return;
      }
    }
  }
}