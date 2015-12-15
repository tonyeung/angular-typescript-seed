namespace app {
	'use strict';

	angular
		.module('app')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);

	function ConfigureAuthentication(authenticationManager: app.auth.IManageAuthentication, authenticator) {
		authenticationManager.authenticate = authenticator.authenticate;
	}
	function ConfigureAuthorization(authorizationManager, authorizer) {
		authorizationManager.authorize = authorizer.authorize;
	}
}