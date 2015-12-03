'use strict';

module.exports = {
	tsFiles: [
		'typings/**/*.d.ts',
		'src/app.core/**/*.ts',
		'src/app/**/*.ts',
		'src/**/*.ts',
		'src/**/*.ts'
		],

	jsFiles: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/toastr/toastr.js'
		],

	cssFiles: [''],

	lessFiles: ['src/app/**/*.less'],

	fontFiles: [''],

	staticContent: [
		'src/assets/**/*',
		'src/app/common/index.html'
	]
}