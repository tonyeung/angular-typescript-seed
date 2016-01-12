namespace app.accounts {
	'use strict';
  
  class UserStore implements app.auth.IUserStore {
    constructor(private $http: ng.IHttpService) { }
    
    public getByUsername(username:string) : app.auth.IAmAUser {
      var user: app.auth.IAmAUser;
      
      //consider creating a data provider or use $resource
      
      if(!user){
        return user = {
          id: 0,
          claims: {},
          passwordHash: '',
          email: ''
        };
      }
      
      return user;
    }
	}

	angular
		.module('app.accounts')
		.service('userStore', UserStore);
}