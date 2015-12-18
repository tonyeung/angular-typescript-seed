namespace app {
	'use strict';

	angular
		.module('app.claims')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("claims", {
				url: "/claims",
				data: {
					pageTitle: "Claims"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "claims/claims.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}