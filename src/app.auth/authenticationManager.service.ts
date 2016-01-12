namespace app.auth {
  'use strict';

    export interface IManageAuthentication {
        user: IAmAUser;
        isAuthenticated: boolean;
        authenticator: IHaveAuthenticationLogic;
        authenticate(...args: any[]): ng.IPromise<ng.IHttpPromiseCallbackArg<IAmAUser>>;
        signOut(): void;
    }
    
    export interface IHaveAuthenticationLogic {
      authenticate(...args: any[]): ng.IPromise<ng.IHttpPromiseCallbackArg<IAmAUser>>;
    }

    class AuthenticationManager implements IManageAuthentication {
        public authenticator: IHaveAuthenticationLogic;
        public user: IAmAUser = {
            id: 0,
            passwordHash: '',
            email: '',
            claims: []
        };
        public isAuthenticated: boolean = false;
        
        constructor(private $q: ng.IQService, 
                    private localStorageService: angular.local.storage.ILocalStorageService) {

            if (!this.user && localStorageService.keys().indexOf('user') > -1) {
                this.user = <IAmAUser>localStorageService.get('user');
                this.isAuthenticated = true;
            }
        }

        public authenticate(...args: any[]): ng.IPromise<ng.IHttpPromiseCallbackArg<IAmAUser>> {
          var defer: ng.IDeferred<ng.IHttpPromiseCallbackArg<IAmAUser>> = this.$q.defer();
          if (!this.authenticator) {
            throw new Error("AuthenticateLogic has not been set. If you are seeing this error, the code in app.run.configure.auth is not being run.")
          }

          this.authenticator.authenticate(args)
            .then((user: IAmAUser) => {
              this.user = user;

              if (this.user.id !== 0) {
                this.isAuthenticated = true;
              }

              defer.resolve(this.user);
            });
            
          return defer.promise;
        }

        public signOut(): void {
            this.user = { id: 0, claims: [], passwordHash: '', email: '' };
            this.isAuthenticated = false;
            this.localStorageService.remove('user');
        }
    }
    
  angular
    .module('app.auth')
    .service('authenticationManager', AuthenticationManager);

}