namespace app {
	'use strict';

	angular
		.module('app.inventory')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("inventory", {
				url: "/inventory",
				templateUrl: "inventory/inventory.html",
				data: {
					pageTitle: "Inventory"
				}
			})
	}
}