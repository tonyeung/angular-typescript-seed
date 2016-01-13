namespace app.auth {
  'use strict';

  export interface IManageAuthorization {
    authorizer: IHaveAuthorizationLogic;
    authorize(...args: any[]): boolean;
  }

  export interface IHaveAuthorizationLogic {
    authorize(...args: any[]): boolean;
  }

  class AuthorizationManager implements IManageAuthorization {
    public authorizer: IHaveAuthorizationLogic;
    
    constructor() { };
    public authorize(...args: any[]): boolean {
      if (!this.authorizer) {
        throw new Error("AuthenticateLogic has not been set. If you are seeing this error, the code in app.run.configure.auth is not being run.")
      }
      
      return this.authorizer.authorize(args);
    }
  }

  angular
    .module('app.auth')
    .service('authorizationManager', AuthorizationManager);
}