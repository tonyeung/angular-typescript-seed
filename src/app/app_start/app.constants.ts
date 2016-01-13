namespace app {
	'use strict';

	angular
		.module('app.config')
		.constant('API_PATH', 'http://localhost:8000/')
		.constant('DEBUG_ROUTER', false);
}