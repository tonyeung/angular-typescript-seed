namespace app {
  'use strict';
  angular.module('app.config')
		.run(Authorization);
    
  interface rootScopeWithUiRouter extends ng.IRootScopeService {
    toState: ng.ui.IState
    toStateParams: ng.ui.IStateParamsService;
  }

  function Authorization($rootScope: rootScopeWithUiRouter, 
                          $state: ng.ui.IStateService, 
                          $stateParams: ng.ui.IStateParamsService, 
                          $timeout: angular.ITimeoutService,
                          authenticationManager: app.auth.IManageAuthentication, 
                          authorizationManager: app.auth.IManageAuthorization,
                          DEBUG_AUTH) {
    $rootScope.$on('$stateChangeStart', checkClaims);

    function checkClaims(event: ng.IAngularEvent, 
                          toState: ng.ui.IState, 
                          toStateParams: ng.ui.IStateParamsService) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (DEBUG_AUTH) return;

      if (toState.data.public) {
        return;
      }

      if (!authenticationManager.isAuthenticated) {        
        $timeout(() => { $state.go('login'); });
        return;
      }

      // need to stick some data into the authorize method
      if (!authorizationManager.authorize(toState.name)) {
        $timeout(() => { $state.go('no access'); });
        return;
      }
    }
  }
}