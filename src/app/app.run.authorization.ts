namespace app {
  'use strict';
  angular.module('app')
		.run(Authorization);

  function Authorization($rootScope, $state, $stateParams, authenticationManager, authorizationManager) {
    $rootScope.$on('$stateChangeStart', checkClaims);

    function checkClaims(event, toState, toStateParams) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (toState.data.public) {
        return;
      }

      if (!authenticationManager.isAuthenticated) {
        $state.go('login', {});
        return;
      }

      // need to stick some data into the authorize method
      if (!authorizationManager.authorize()) {
        $state.go('no access', {});
        return;
      }
    }
  }
}