namespace app.core {
	'use strict';

	angular
		.module('app.core')
		.run(SetUiRouterOnRoot)
		.config(ConfigureHtml5Mode);

	function SetUiRouterOnRoot ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

  		$rootScope.$on("$stateChangeError", console.log.bind(console));
	}

	function ConfigureHtml5Mode($locationProvider: angular.ILocationProvider) {
		$locationProvider.html5Mode(true);
	}
}