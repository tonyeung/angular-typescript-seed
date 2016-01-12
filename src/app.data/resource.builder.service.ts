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

// 
// interface IEmployee extends ng.resource.IResource<IEmployee>
// {
//     id: number;
//     firstName : string;
//     lastName : string;
// }
// interface IEmployeeResource extends ng.resource.IResourceClass<IEmployee>
// {
//     update(IEmployee) : IEmployee;
// }
// 
// angular
//     .module('myapp', ['ngResource'])
//     .factory('EmployeeResource', ['$resource', ($resource : ng.resource.IResourceService) : IEmployeeResource => {
// 
//         // Define your custom actions here as IActionDescriptor
//         var updateAction : ng.resource.IActionDescriptor = {
//             method: 'PUT',
//             isArray: false
//         };
// 
//         // Return the resource, include your custom actions
//         return <IEmployeeResource> $resource('/api/employee/:id', { id: '@id' }, {
//             update: updateAction
//         });
// 
//     }])
//     .controller('TestCtrl', ['EmployeeResource', (Employee : IEmployeeResource) =>
//     {
//         // Get all employees
//         var employees : Array<IEmployee> = Employee.query();
// 
//         // Get specific employee, and change their last name
//         var employee : IEmployee = Employee.get({ id: 123 });
//         employee.lastName = 'Smith';
//         employee.$save();
// 
//         // Custom action
//         var updatedEmployee : IEmployee = Employee.update({ id: 100, firstName: "John" });
//     }]);