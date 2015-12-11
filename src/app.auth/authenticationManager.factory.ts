namespace app.auth {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('AuthenticationManagerFactory', AuthenticationManagerFactory);
    
    export interface IManageAuthentication {}
    
    export interface IAmAUser {
        id: number;
        claims: number[]
    }
    
    export interface IAuthenticate {
      (params:any): IAmAUser;
    }
    
    function AuthenticationManagerFactory(localStorageService) {
        var self = this;
        self.authenticateLogic = null;
        self.user = null;
        self.isAuthenticated = false;

        return factory; 
        function factory(AuthenticateLogic?) {
            if(!self.authenticateLogic && !AuthenticateLogic) {
                throw new Error("AuthenticateLogic has not been set. If you are seeing self error, the code in app.config.auth.ts is not being run.")
            }
            
            if (!self.user && localStorageService.keys().indexOf('user') > -1) {
                self.user = localStorageService.get('user');
            }
            
            if(AuthenticateLogic) {
                self.authenticateLogic = AuthenticateLogic;
            }  
              
            var serviceObject = {
                user: self.user,
                authenticate: authenticate,
                signOut: signOut,
                isAuthenticated: self.isAuthenticated,
                authenticateLogic: self.authenticateLogic
            };            
            return serviceObject;
            
            function authenticate(params) {
                self.user = self.authenticateLogic(params);
                if (self.user) {
                    self.isAuthenticated = true;
                }
                return self.user;
            }

            function signOut() {
                self.user = null;
                self.isAuthenticated = false;
                localStorageService.remove('user');

                return true;
            }
            
        }
    }
}