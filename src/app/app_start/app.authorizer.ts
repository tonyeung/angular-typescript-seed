// authentication logic goes here
namespace app {
  'use strict';
  
  class Authorizer implements app.auth.IHaveAuthorizationLogic {
    constructor(private authenticationManager: app.auth.IManageAuthentication) { }

    public authorize = (name: string): boolean => {
      var user = this.authenticationManager.user;      
      return true;
    }
  }

  angular.module('app.config')
    .service("authorizer", Authorizer);
}