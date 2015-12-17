namespace app {
	'use strict';

	angular
		.module('app.config')
		.config(Configure404);

	function Configure404($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("404", {
				url: "/404-page-not-found",
				templateUrl: "common/404.html",
				data: {
					pageTitle: "404 - page not found"
				}
			})
	}
}