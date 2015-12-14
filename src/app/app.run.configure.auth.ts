namespace app {
	'use strict';

	angular
		.module('app')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);

	function ConfigureAuthentication(authenticationManager: app.auth.IManageAuthentication, Authenticator) {
		authenticationManager.authenticate = Authenticator.authenticate;
	}
	function ConfigureAuthorization(authorizationManager, Authorizer) {
		authorizationManager.authorize = Authorizer.authorize;
	}
}