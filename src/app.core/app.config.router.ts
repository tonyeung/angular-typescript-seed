namespace app.core {
	'use strict';

	angular
		.module('app.core')
		.run(SetUiRouterOnRoot)
		.config(ConfigureRouting);

	function SetUiRouterOnRoot ($rootScope, $state, $stateParams): void {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

  		$rootScope.$on("$stateChangeError", console.log.bind(console));
	}

	function ConfigureRouting($locationProvider: angular.ILocationProvider,
							  $urlRouterProvider: ng.ui.IUrlRouterProvider)
							  : void {

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/");
	}
}