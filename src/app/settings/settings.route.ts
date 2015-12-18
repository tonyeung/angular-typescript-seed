namespace app {
	'use strict';

	angular
		.module('app.settings')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("settings", {
				url: "/settings",
				templateUrl: "settings/settings.html",
				data: {
					pageTitle: "Settings"
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "settings/settings.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}