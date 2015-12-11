namespace app.auth {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('AuthenticationManagerFactory', AuthenticationManagerFactory);
        
    export interface IAmAUser {
        id: number;
        claims: number[]
    }
    
    export interface IAuthenticate {
      (params?:any): IAmAUser;
    }
    
    function AuthenticationManagerFactory(localStorageService)  {
        var user: IAmAUser = {
            id: 0,
            claims: []
        };
        var authenticateLogic: IAuthenticate = function(){ return user };
        var isAuthenticated = false;

        return factory; 
        function factory(AuthenticateLogic?) {
            if(!authenticateLogic && !AuthenticateLogic) {
                throw new Error("AuthenticateLogic has not been set. If you are seeing this error, the code in app.config.auth.ts is not being run.")
            }
            
            if (!user && localStorageService.keys().indexOf('user') > -1) {
                user = localStorageService.get('user');
            }
            
            if(AuthenticateLogic) {
                authenticateLogic = AuthenticateLogic;
            }  
              
            var serviceObject = {
                authenticate: authenticate,
                signOut: signOut,
                getIsAuthenticated: function() { return isAuthenticated },
                getUser: function() { return user }
            };            
            return serviceObject;
            
            function authenticate(params) {
                user = authenticateLogic(params);
                if (user) {
                    isAuthenticated = true;
                }
                return user;
            }

            function signOut() {
                user = null;
                isAuthenticated = false;
                localStorageService.remove('user');

                return true;
            }
            
        }
    }
}