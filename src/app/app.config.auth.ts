namespace app {
	'use strict';

	angular
		.module('app')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);

	function ConfigureAuthentication(AuthenticationManagerFactory, Authenticator) {
		AuthenticationManagerFactory(Authenticator.authenticate);
	}
	function ConfigureAuthorization(AuthorizationManager, Authorizer) {
		AuthorizationManager(Authorizer.authorize);
	}
}