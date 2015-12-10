namespace app.auth {
  'use strict';
  
  angular
    .module('app.auth')
    .factory('AuthorizationManager', AuthorizationManager);
    
    export interface IManageAuthorization {}
    
    export function AuthorizationManager(localStorageService, AuthenticationManagerFactory) {
        var authorizeLogic;

        return function (authorizeLogic) {
            return new Service(authorizeLogic);
        }

        function Service(authorizeLogic) {
            authorizeLogic = authorizeLogic;

            this.authorize = authorize;

            function authorize(params) {
                if(!AuthenticationManagerFactory.isAuthenticated) {
                    return false;
                }
                
                return authorizeLogic(params);
            }
        }
    }
}