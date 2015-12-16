namespace app {
	'use strict';

	angular
		.module('app.claims')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("claims", {
				url: "/claims",
				templateUrl: "claims/claims.html",
				data: {
					pageTitle: "Claims"
				}
			})
	}
}