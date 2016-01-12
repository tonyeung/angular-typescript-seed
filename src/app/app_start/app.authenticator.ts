// authentication logic goes here
namespace app {
  'use strict';


  export class Authenticator implements app.auth.IHaveAuthenticationLogic {
    
    constructor(private resourceBuilder: app.data.IBuildResources<app.auth.IAmAUser>, private $q: ng.IQService) {
    }

    public authenticate(username: string, password: string): ng.IPromise<ng.IHttpPromiseCallbackArg<app.auth.IAmAUser>> {
       
      var defer: ng.IDeferred<ng.IHttpPromiseCallbackArg<app.auth.IAmAUser>> = this.$q.defer();
      var userResource = this.resourceBuilder
                              .getResource('users');
      
      var users = userResource.query(() => {
        var user = users[0];
        defer.resolve(user);
      });
      return defer.promise;
    }
  }

  angular
    .module('app.config')
    .service("authenticator", Authenticator);
}