namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("accounts", {
        parent: 'root',
				url: "/accounts",
				data: {
					pageTitle: "Accounts"
				},
				views:{
					'@' : {
						templateUrl: "accounts/accounts.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}