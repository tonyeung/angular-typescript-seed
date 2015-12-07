'use strict';

module.exports = {
	jsFiles: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/bootstrap-material-design/dist/js/material.js',
        'bower_components/bootstrap-material-design/dist/js/ripples.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/toastr/toastr.js'
		],

	tsFiles: [
		'typings/**/*.d.ts',
		'src/app.core/app.core.ts',
		'src/app/app.ts',
		'src/app.core/**/*.ts',
		'src/app/**/*.ts',
		'src/**/*.ts'
		],

	cssFiles: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.css',
        'bower_components/bootstrap-material-design/dist/css/ripples.css',
        'bower_components/toastr/toastr.css',
		'bower_components/font-awesome/css/font-awesome.css'
	],

	lessFiles: [
		'src/app/**/*.less'
	],

	fontFiles:[
        'bower_components/bootstrap/fonts/**/*',
        'bower_components/fontawesome/fonts/**/*'
	],

	staticContent: [
		'src/assets/**/*',
		'src/app/index.html'
	]
}