namespace app {
	'use strict';

	angular
		.module('app.reports')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("reports", {
				url: "/reports",
				templateUrl: "reports/reports.html",
				data: {
					pageTitle: "Reports"
				}
			})
	}
}