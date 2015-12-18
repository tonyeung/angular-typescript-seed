namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("no access", {
				url: "/no-access",
				templateUrl: "accounts/noAccess.html",
				data: {
					pageTitle: "no access"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "accounts/noAccess.html",
						//controller: "LoginController",
						//controllerAs: "vm"				
					}
				}
			})
	}
}