'use strict';

module.exports = {
	tsFiles: [
		'typings/tsd.d.ts',
		'src/app.toastrLogging/app.toastrLogging.module.ts',
		'src/app.globalErrorDecorator/app.globalErrorDecorator.module.ts',
		'src/app.constants/app.constants.module.ts',
		'src/app.data/app.data.module.ts',
		'src/app.auth/app.auth.module.ts',
		'src/app.core/app.core.module.ts',
		'src/app/app.module.ts',
		'src/app/**/*.module.ts',
		'src/**/*.ts'
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