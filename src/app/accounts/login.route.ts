namespace app {
	'use strict';

	angular
		.module('app')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("login", {
				url: "/login",
				templateUrl: "accounts/login.html",
				data: {
					pageTitle: "login",
					public: true
				}
			})
	}
}