namespace app {
	'use strict';

	angular
		.module('app.config')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);

	function ConfigureAuthentication(authenticationManager: app.auth.IManageAuthentication, authenticator: app.auth.IHaveAuthenticationLogic) {
		authenticationManager.authenticator = authenticator;
	}
	function ConfigureAuthorization(authorizationManager, authorizer) {
		authorizationManager.authorize = authorizer.authorize;
	}
}