namespace app.globalErrorDecorator {
  'use strict';
    
    export interface IAmTheGlobalErrorDecoratorProvider extends ng.IServiceProvider {
        $get: () => ICreateGlobalErrorDecorator;
    }
    
    export interface ICreateGlobalErrorDecorator {
        setBeforeErrorFunc: (func: (exception: any, cause: any) => void) => void;
        setAfterErrorFunc: (func: (exception: any, cause: any) => void) => void;
        createDecorator: ($delegate: ng.IExceptionHandlerService) => (exception: any, cause: any) => void;
    }
  
    class GlobalErrorDecoratorProvider implements IAmTheGlobalErrorDecoratorProvider {
        private handlers = {
            beforeError: (exception: any, cause: any) => {},
            afterError: (exception: any, cause: any) => {}
        };
        
        constructor() {
            this.handlers.beforeError = (exception: any, cause: any) => {};
            this.handlers.afterError = (exception: any, cause: any) => {};
        }
        
        $get : () => ICreateGlobalErrorDecorator = () => {
            return {
                setBeforeErrorFunc: this.setBeforeErrorFunc,
                setAfterErrorFunc: this.setAfterErrorFunc,
                createDecorator: ($delegate: ng.IExceptionHandlerService) => {
                    return (exception: any, cause: any) => {
                        this.handlers.beforeError(exception, cause);
                        $delegate(exception, cause);
                        this.handlers.afterError(exception, cause);
                    }
                }
            };
        }
        
        private setBeforeErrorFunc = (func: (exception: any, cause: any) => void) => {
            this.handlers.beforeError = func;
        };
        
        private setAfterErrorFunc = (func: (exception: any, cause: any) => void) => {
            this.handlers.afterError = func;
        };
    }
    
  angular
    .module('app.globalErrorDecorator')
    .provider('globalErrorDecorator', GlobalErrorDecoratorProvider);
}