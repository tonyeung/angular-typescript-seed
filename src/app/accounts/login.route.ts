namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("login", {
				url: "/login",
				templateUrl: "accounts/login.html",
				controller: "LoginController",
				controllerAs: "vm",				
				data: {
					pageTitle: "login",
					public: true
				}
			})
	}
}