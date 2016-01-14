namespace app {
	'use strict';

	angular
		.module('app.config')
		.run(ConfigureAuthentication)
		.run(ConfigureAuthorization);


  import IManageAuthentication = app.auth.IManageAuthentication;
  import IHaveAuthenticationLogic = app.auth.IHaveAuthenticationLogic;

	function ConfigureAuthentication(authenticationManager: IManageAuthentication, authenticator: IHaveAuthenticationLogic) {
		authenticationManager.authenticator = authenticator;
	}
	function ConfigureAuthorization(authorizationManager: app.auth.IManageAuthorization, authorizer) {
		authorizationManager.authorize = authorizer.authorize;
	}
}