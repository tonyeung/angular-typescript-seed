namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("login", {
				url: "/login",
				data: {
					pageTitle: "login",
					public: true
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "accounts/login.html",
						controller: "LoginController",
						controllerAs: "vm"				
					}
				}
			})
	}
}