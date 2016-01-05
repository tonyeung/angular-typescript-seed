namespace app {
	'use strict';

	angular
		.module('app.inventory')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("inventory", {
        parent: 'root',
				url: "/inventory",
				data: {
					pageTitle: "Inventory"
				},
				views:{
					'@' : {
						templateUrl: "inventory/inventory.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}