namespace app {
	'use strict';

	angular
		.module('app.inventory')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("inventory", {
				url: "/inventory",
				data: {
					pageTitle: "Inventory"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "inventory/inventory.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}