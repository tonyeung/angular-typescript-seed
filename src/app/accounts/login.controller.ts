namespace app {
	export interface IControlLogin {
		username: string;
		password: string;
		login(username: string, password: string): void; 
	}
	
	class LoginController implements IControlLogin {
		username: string;
		password: string;
		
		constructor(private authenticationManager: app.auth.IManageAuthentication){}
		
		login(username: string, password: string): void {			
			var user: app.auth.IAmAUser = {
				id: 1,
				claims: { 
					'username': username,
					'password': password 
				}
			}
			//user the autheticationManager and userManager to actually authenticate
			return this.authenticationManager.authenticate(user);
		}
	}
	
	angular
		.module('app')
		.controller("LoginController", LoginController);
}