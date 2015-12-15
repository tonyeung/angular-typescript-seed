// authentication logic goes here
namespace app {
  'use strict';
  
    interface IHaveAuthorizationLogic {
		authorize(authenticationManager: app.auth.IManageAuthentication, params?: any): boolean;
	}

    class Authorizer implements IHaveAuthorizationLogic {
        constructor() {}

        public authorize(authenticationManager: app.auth.IManageAuthentication, params?: any): boolean {
			     return true;
        }
    }
	
  angular.module('app')
		.service("authorizer", Authorizer);
}