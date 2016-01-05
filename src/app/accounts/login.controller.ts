namespace app {
	export interface IControlLogin {
		username: string;
		password: string;
		invalid: boolean;
		login(username: string, password: string): void; 
	}
	
	class LoginController implements IControlLogin {
		username: string;
		password: string;
		invalid: boolean = false;
		
		constructor(private $location: ng.ILocationService, private authenticationManager: app.auth.IManageAuthentication){}
		
		login(username: string, password: string): void {			
			var user: app.auth.IAmAUser = {
				id: 1,
				claims: { 
					'username': username,
					'password': password 
				}
			}
			//user the autheticationManager and userManager to actually authenticate
			var user = this.authenticationManager.authenticate(user);
			if (user.id === 0) {
				this.invalid = true;
			}
			else {
				this.$location.path('/dashboard');
			}
		}
	}
	
	angular
		.module('app.accounts')
		.controller("LoginController", LoginController);
}