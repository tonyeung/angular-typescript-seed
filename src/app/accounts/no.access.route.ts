namespace app {
	'use strict';

	angular
		.module('app')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("no access", {
				url: "/no-access",
				templateUrl: "accounts/noAccess.html",
				data: {
					pageTitle: "no access"
				}
			})
	}
}