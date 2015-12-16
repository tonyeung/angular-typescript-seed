// authentication logic goes here
namespace app {
  'use strict';

  interface IHaveAuthenticationLogic {
    authenticate(params?: any): app.auth.IAmAUser;
  }

  class Authenticator implements IHaveAuthenticationLogic {
    constructor() { }

    public authenticate(user: app.auth.IAmAUser): app.auth.IAmAUser {
      return user;
    }
  }

  angular
    .module('app.config')
    .service("authenticator", Authenticator);
}