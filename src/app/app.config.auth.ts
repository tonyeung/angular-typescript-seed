namespace app {
	'use strict';

	angular
		.module('app')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);

	function ConfigureAuthentication(AuthenticationManagerFactory, Authenticator) {
		AuthenticationManagerFactory(Authenticator.authenticate);
	}
	function ConfigureAuthorization(AuthorizationManagerFactory, Authorizer) {
		AuthorizationManagerFactory(Authorizer.authorize);
	}
}