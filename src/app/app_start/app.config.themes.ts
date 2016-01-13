namespace app {
	'use strict';

	angular
		.module('app.config')
		.config(Themes);

	function Themes($mdThemingProvider: ng.material.IThemingProvider) {
		
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue')
	}
}