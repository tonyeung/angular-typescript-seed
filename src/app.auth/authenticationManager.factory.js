var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        angular
            .module('app.auth')
            .factory('AuthenticationManagerFactory', AuthenticationManagerFactory);
        function AuthenticationManagerFactory(localStorageService) {
            this.authenticateLogic = null;
            this.user = null;
            this.isAuthenticated = false;
            return factory;
            function factory(AuthenticateLogic) {
                if (!this.authenticateLogic && !AuthenticateLogic) {
                    throw new Error("AuthenticateLogic has not been set. If you are seeing this error, the code in app.config.auth.us is not being run.");
                }
                if (!this.user && localStorageService.keys().indexOf('user') > -1) {
                    this.user = localStorageService.get('user');
                }
                if (AuthenticateLogic) {
                    this.authenticateLogic = AuthenticateLogic;
                }
                var serviceObject = {
                    user: this.user,
                    authenticate: authenticate,
                    signOut: signOut,
                    isAuthenticated: this.isAuthenticated,
                    authenticateLogic: this.authenticateLogic
                };
                return serviceObject;
                function authenticate(params) {
                    this.user = this.authenticateLogic(params);
                    if (this.user) {
                        this.isAuthenticated = true;
                    }
                    return this.user;
                }
                function signOut() {
                    this.user = null;
                    this.isAuthenticated = false;
                    localStorageService.remove('user');
                    return true;
                }
            }
        }
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
