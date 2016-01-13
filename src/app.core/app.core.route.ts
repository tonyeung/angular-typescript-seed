namespace app {
	'use strict';

	angular
		.module('app.core')
		.config(ConfigureState);

	function ConfigureState($stateProvider: ng.ui.IStateProvider, SITE_HEADER_NAME) {
		$stateProvider
			.state("root", {
        abstract: true,
        data: {
          siteTitle: SITE_HEADER_NAME
        },
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