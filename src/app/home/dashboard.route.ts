namespace app {
	'use strict';

	angular
		.module('app.home')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("dashboard", {
        parent: 'root',
				url: "/dashboard",
				data: {
					pageTitle: "Dashboard"
				},
				views:{
					'@' : {
						templateUrl: "home/dashboard.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}