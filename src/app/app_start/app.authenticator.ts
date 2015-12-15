// authentication logic goes here
namespace app {
  'use strict';
  
    interface IHaveAuthenticationLogic {
		authenticate(params?: any): app.auth.IAmAUser;
	}

    class Authenticator implements IHaveAuthenticationLogic {
        constructor() {}

        public authenticate(params?: any): app.auth.IAmAUser {
			var user: app.auth.IAmAUser = {
				id: 0,
				claims: []
			};
	
			return user;
        }
    }
	
  angular
	.module('app')
	.service("authenticator", Authenticator);
}