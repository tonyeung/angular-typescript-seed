namespace app.auth {
  'use strict';

    export interface IManageAuthorization {
        authorize(authenticationManager: IManageAuthentication, ...args: any[]): boolean;
    }

    class AuthorizationManager implements IManageAuthorization {
        constructor(){};
        public authorize(authenticationManager: IManageAuthentication, ...args: any[]): boolean {
            throw new Error("AuthorizeLogic has not been set. If you are seeing self error, the code in app.run.configure.auth is not being run.")
        }
    }

  angular
    .module('app.auth')
    .service('authorizationManager', AuthorizationManager);
}