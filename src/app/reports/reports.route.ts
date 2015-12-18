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
				},
				views:{
					'header' : {
						templateUrl: 'layout/header.html'
					},
					'nav' : {
						templateUrl: 'layout/nav.html'
					},
					'' : {
						templateUrl: "reports/reports.html",
						// controller: "LoginController",
						// controllerAs: "vm"				
					}
				}
			})
	}
}