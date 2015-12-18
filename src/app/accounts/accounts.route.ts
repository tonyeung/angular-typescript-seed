namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("accounts", {
				url: "/accounts",
				data: {
					pageTitle: "Accounts"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "accounts/accounts.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}