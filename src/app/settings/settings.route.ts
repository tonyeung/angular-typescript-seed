namespace app {
	'use strict';

	angular
		.module('app.settings')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("settings", {
        parent: 'root',
				url: "/settings",
				templateUrl: "settings/settings.html",
				data: {
					pageTitle: "Settings"
				},
				views:{
					'@' : {
						templateUrl: "settings/settings.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}