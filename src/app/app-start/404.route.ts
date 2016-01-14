namespace app {
	'use strict';

	angular
		.module('app.config')
		.config(Configure404);

	function Configure404($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("404", {
        parent: 'root',
				url: "/404-page-not-found",
				data: {
					pageTitle: "404 - page not found"
				},
				views:{
					'@' : {
						templateUrl: "app-start/404.html",
						//controller: "LoginController",
						//controllerAs: "vm"				
					}
				}
			})
	}
}