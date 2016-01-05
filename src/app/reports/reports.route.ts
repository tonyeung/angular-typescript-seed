namespace app {
	'use strict';

	angular
		.module('app.reports')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("reports", {
        parent: 'root',
				url: "/reports",
				templateUrl: "reports/reports.html",
				data: {
					pageTitle: "Reports"
				},
				views:{
					'' : {
						templateUrl: "reports/reports.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}