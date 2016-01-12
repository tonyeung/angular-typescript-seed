namespace app {
	export interface IControlLogin {
		username: string;
		password: string;
		invalid: boolean;
		login(username: string, password: string): void; 
	}
	
	class LoginController implements IControlLogin {
		public username: string;
		public password: string;
		public invalid: boolean = false;
    private code: string;
    private accessToken: string;
    
		constructor(private $location: ng.ILocationService, 
                private authenticationManager: app.auth.IManageAuthentication) {
                  
      if (this.authenticationManager.isAuthenticated) {
        $location.path("/dashboard");
        return;
      }
      
      // oauth
      // var hash: string[] = $location.hash().split('&');
      // if (hash[0] !== '') {
      //   var code: string = hash[0].split('=')[1];
      //   var accessToken: string =  hash[1].split('=')[1];
      //   var state: string = hash[5].split('=')[1];
      //   this.authenticationManager.authenticate(code, accessToken);
      // }
    }
		
		login(username: string, password: string): void {
      // oauth
      // var queryString = "client_id=vsatportal&scope=offline_access openid vsatportal&response_type=code token&redirect_uri=" + BASE_PATH + "login&state=" + genGuid() + "&nonce=" + genGuid();
      // $window.location.href = OAUTH_PATH + 'connect/authorize?' + queryString;
      
			this.authenticationManager.authenticate(username, password)
        .then((user: app.auth.IAmAUser) => {
          if (user.id === 0) {
            this.invalid = true;
          }
          else {
            this.$location.path('/dashboard');
          }
        });
    }

    // oauth
    // private genGuid = (): string => {
    //   //'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    //   return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    //   });
    // }
  }
	
	angular
		.module('app.accounts')
		.controller("LoginController", LoginController);
}