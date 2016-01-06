namespace app {
	'use strict';

	angular
		.module('app.core')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state("root", {
        abstract: true,
				views:{
					'header@' : {
						templateUrl: 'layout/header.html',
            controller: 'HeaderController',
            controllerAs: "vm",
            resolve: {
              isOpen: () => { return false; }
            }
                        
					},
					'nav@' : {
						templateUrl: 'layout/nav.html',
            controller: 'NavController',
            controllerAs: "vm"
					}
				}
			})
	}
}