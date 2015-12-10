var app;
(function (app) {
    'use strict';
    angular.module('app')
        .run(Authorization);
    function Authorization($rootScope, $state, $stateParams, AuthenticationManagerFactory, AuthorizationManager) {
        $rootScope.$on('$stateChangeStart', checkClaims);
        function checkClaims(event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // console.log(toState);
            // console.log(toStateParams);
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (AuthenticationManagerFactory.isAuthenticated) {
                AuthorizationManager.authorize();
            }
        }
    }
})(app || (app = {}));
