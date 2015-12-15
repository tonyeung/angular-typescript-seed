namespace app {
  'use strict';
  angular.module('app')
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
                          authorizationManager: app.auth.IManageAuthorization) {
    $rootScope.$on('$stateChangeStart', checkClaims);

    function checkClaims(event: ng.IAngularEvent, 
                          toState: ng.ui.IState, 
                          toStateParams: ng.ui.IStateParamsService) {
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (toState.data.public) {
        return;
      }

      if (!authenticationManager.isAuthenticated) {        
        $timeout(() => { $state.go('login'); });
        return;
      }

      // need to stick some data into the authorize method
      if (!authorizationManager.authorize(authenticationManager)) {
        $timeout(() => { $state.go('no access'); });
        return;
      }
    }
  }
}