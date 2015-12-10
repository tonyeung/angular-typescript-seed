var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        angular
            .module('app.auth')
            .factory('AuthorizationManager', AuthorizationManager);
        function AuthorizationManager(localStorageService, AuthenticationManagerFactory) {
            var authorizeLogic;
            return function (authorizeLogic) {
                return new Service(authorizeLogic);
            };
            function Service(authorizeLogic) {
                authorizeLogic = authorizeLogic;
                this.authorize = authorize;
                function authorize(params) {
                    if (!AuthenticationManagerFactory.isAuthenticated) {
                        return false;
                    }
                    return authorizeLogic(params);
                }
            }
        }
        auth.AuthorizationManager = AuthorizationManager;
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
