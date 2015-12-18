namespace app {
	'use strict';

	angular
		.module('app.home')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("dashboard", {
				url: "/",
				data: {
					pageTitle: "Dashboard"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "home/dashboard.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}