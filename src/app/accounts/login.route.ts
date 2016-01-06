namespace app {
	'use strict';

	angular
		.module('app.accounts')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("login", {
        parent: 'root',
				url: "/login",
				data: {
					pageTitle: "login",
					public: true
				},
				views:{
					'@' : {
						templateUrl: "accounts/login.html",
						controller: "LoginController",
						controllerAs: "vm"
					},
					'header@' : {},
          'nav@': {}
				}
			})
	}
}