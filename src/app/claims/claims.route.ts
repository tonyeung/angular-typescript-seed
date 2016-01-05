namespace app {
	'use strict';

	angular
		.module('app.claims')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("claims", {
        parent: 'root',
				url: "/claims",
				data: {
					pageTitle: "Claims"
				},
				views:{
					'@' : {
						templateUrl: "claims/claims.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}