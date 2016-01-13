namespace app.constants {
	'use strict';

	angular
		.module('app.constants')
		.constant('SITE_HEADER_NAME', 'ACME Inc')
		.constant('API_PATH', 'http://localhost:8000/')
		.constant('DEBUG_ROUTER', false)
		.constant('DEBUG_AUTH', false);
}