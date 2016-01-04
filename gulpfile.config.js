'use strict';

module.exports = {
    // get rid of this after refactor
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
		'typings/tsd.d.ts',
		'src/app.toastrLogging/app.toastrLogging.ts',
		'src/app.globalErrorDecorator/app.globalErrorDecorator.ts',
		'src/app.auth/app.auth.ts',
		'src/app.core/app.core.ts',
		'src/app/app.ts',
		'src/app/accounts/app.accounts.ts',
		'src/app/app_start/app.config.ts',
		'src/app/claims/app.claims.ts',
		'src/app/home/app.home.ts',
		'src/app/inventory/app.inventory.ts',
		'src/app/reports/app.reports.ts',
		'src/app/settings/app.settings.ts',
		'src/**/*.ts'
		],
    // this one too
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
        'bower_components/font-awesome/fonts/**/*'
	],
    
    mochaTestingLibs: [
        'node_modules/chai/chai.js',
        'node_modules/chai-as-promised/lib/chai-as-promised.js',
        'node_modules/mocha/mocha.js',
        'node_modules/sinon/lib/sinon.js',
        'node_modules/sinon-chai/lib/sinon-chai.js'
    ],
    
    getWireDepOptions: function() {
        return {
            json: 'bower.json', 
            directory: 'bower_components'
        }
    }
}