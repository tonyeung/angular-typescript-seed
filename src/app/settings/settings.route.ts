namespace app {
	'use strict';

	angular
		.module('app')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("settings", {
				url: "/settings",
				templateUrl: "settings/settings.html",
				data: {
					pageTitle: "Settings"
				}
			})
	}
}