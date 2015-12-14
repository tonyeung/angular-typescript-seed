// authentication logic goes here
namespace app {
  'use strict';
  angular.module('app')
		.value("authenticator", Authenticator);

	function Authenticator(authenticationManager: app.auth.IManageAuthentication, params: any): app.auth.IAmAUser {
		var user: app.auth.IAmAUser = {
			id: 0,
			claims: []
		};

		return user;
	}
}