namespace app.auth {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('AuthorizationManager', AuthorizationManager);
    
    export interface IManageAuthorization {}
    
    export function AuthorizationManager(localStorageService, AuthenticationManagerFactory) {
        var self = this;
        self.authorizeLogic = undefined;

        return factory;

        function factory(AuthorizeLogic) {      
            if(!self.authorizeLogic && !AuthorizeLogic) {
                throw new Error("AuthorizeLogic has not been set. If you are seeing self error, the code in app.config.auth.ts is not being run.")
            }
            
            if(AuthorizeLogic) {
                self.authorizeLogic = AuthorizeLogic;
            }
            
            var serviceObject = {
                authorize: authorize
            }
            return serviceObject;            

            function authorize(params) {
                if(!AuthenticationManagerFactory.isAuthenticated) {
                    return false;
                }
                
                return self.authorizeLogic(params);
            }
        }
    }
}