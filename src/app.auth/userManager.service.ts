namespace app.auth {
  'use strict';

    export interface IManageUsers {
		
    }

    class UserManager implements IManageUsers {
        constructor(){};
        public authorize(authenticationManager: IManageAuthentication, params?: any): boolean {
            throw new Error("AuthorizeLogic has not been set. If you are seeing self error, the code in app.run.configure.auth is not being run.")
        }
    }

  angular
    .module('app.auth')
    .service('userManager', UserManager);
}