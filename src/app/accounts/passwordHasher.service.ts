namespace app.accounts {
	'use strict';
  
  class PasswordHasher implements app.auth.IHashPasswords {
    constructor() { }
    
    public hash(password: string) : string {
      
      return '';
    }
	}

	angular
		.module('app.accounts')
		.service('passwordHasher', PasswordHasher);
}