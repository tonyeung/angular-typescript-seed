namespace app {
	'use strict';

	angular
		.module('app')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("dashboard", {
				url: "/",
				templateUrl: "home/dashboard.html",
				data: {
					pageTitle: "dashboard"
				}
			})
	}
}