namespace app.core {
	'use strict';

	angular
		.module('app.config')
		.config(ConfigureExceptionHandling);

	function ConfigureExceptionHandling($provide: ng.auto.IProvideService,
				globalErrorDecoratorProvider: app.core.IAmTheGlobalErrorDecoratorProvider) {
		
		var decorator = globalErrorDecoratorProvider.$get();
		decorator.setBeforeErrorFunc(() => { console.log('before exception'); });
		decorator.setAfterErrorFunc(() => { console.log('after exception') });
		
		$provide.decorator('$exceptionHandler', decorator.createDecorator);
	}
}