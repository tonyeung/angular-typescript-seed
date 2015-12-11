namespace app.auth {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('AuthorizationManagerFactory', AuthorizationManagerFactory);
    
    export interface IManageAuthorization {}
    
    export function AuthorizationManagerFactory(AuthenticationManagerFactory) {        
        var authorizeLogic = undefined;
        var authenticationManager = AuthenticationManagerFactory();

        return factory;

        function factory(AuthorizeLogic) {      
            if(!authorizeLogic && !AuthorizeLogic) {
                throw new Error("AuthorizeLogic has not been set. If you are seeing self error, the code in app.config.auth.ts is not being run.")
            }
            
            if(AuthorizeLogic) {
                authorizeLogic = AuthorizeLogic;
            }
            
            var serviceObject = {
                authorize: authorize
            }
            return serviceObject;

            function authorize(params) {
                if(!authenticationManager.getIsAuthenticated()) {
                    return false;
                }
                
                return authorizeLogic(params);
            }
        }
    }
}