namespace app.data {
	'use strict';
  
  import IResource = ng.resource.IResource;
  import IResourceClass = ng.resource.IResourceClass;
  
  export interface IBuildResources<T> {
    getResource(name: string) : IResourceClass<IResource<T>>
  }
  
  class resourceBuilder<T> implements IBuildResources<T> {    
    constructor(private $injector: ng.auto.IInjectorService, 
                private $resource: ng.resource.IResourceService,
                private API_PATH: string) { }
    
    getResource = (name: string) : IResourceClass<IResource<T>> => {
      var resource: IResourceClass<ng.resource.IResource<T>>;
      
      try {
        resource = this.$injector.get<IResourceClass<IResource<T>>>(name);
      }
      catch(error) {        
        var updateAction : ng.resource.IActionDescriptor = {
            method: 'PUT',
            isArray: false
        };
        resource = this.$resource<IResource<T>>(this.API_PATH + name, { id: '@id' }, {
            update: updateAction
        });        
      }
      
      return resource;
    }
  }
  
	angular
		.module('app.data')
		.service('resourceBuilder', resourceBuilder);
}