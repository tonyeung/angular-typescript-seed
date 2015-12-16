namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("accounts", {
				url: "/accounts",
				templateUrl: "accounts/accounts.html",
				data: {
					pageTitle: "Accounts"
				}
			})
	}
}