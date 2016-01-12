// authentication logic goes here
namespace app {
  'use strict';

  import IBuildResources = app.data.IBuildResources;
  import IAmAUser = app.auth.IAmAUser;

  class Authenticator implements app.auth.IHaveAuthenticationLogic {
    
    constructor(private resourceBuilder: IBuildResources<IAmAUser>, private $q: ng.IQService) { }

    public authenticate(username: string, password: string): ng.IPromise<ng.IHttpPromiseCallbackArg<IAmAUser>> {
       
      var defer: ng.IDeferred<ng.IHttpPromiseCallbackArg<IAmAUser>> = this.$q.defer();
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