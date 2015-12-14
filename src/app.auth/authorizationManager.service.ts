namespace app.auth {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthorizationManager', AuthorizationManager);

    export interface IManageAuthorization {
        authorize(authenticationManager: IManageAuthentication, params: any): boolean;
    }

    class AuthorizationManager implements IManageAuthorization {
        constructor(private AuthenticationManager: IManageAuthentication) {}
        authorize(authenticationManager: IManageAuthentication, params: any): boolean {
            throw new Error("AuthorizeLogic has not been set. If you are seeing self error, the code in app.run.configure.auth is not being run.")
        }
    }
}