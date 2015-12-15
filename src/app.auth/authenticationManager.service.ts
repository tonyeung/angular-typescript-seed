namespace app.auth {
  'use strict';

    export interface IAmAUser {
        id: number;
        claims: number[]
    }

    export interface IManageAuthentication {
        user: IAmAUser;
        isAuthenticated: boolean;
        authenticate(params?: any): IAmAUser;
        signOut(): void;
    }

    class AuthenticationManager implements IManageAuthentication {
        public user: IAmAUser = {
            id: 0,
            claims: []
        };
        public isAuthenticated: boolean = false;
        constructor(private localStorageService: angular.local.storage.ILocalStorageService) {

            if (!this.user && localStorageService.keys().indexOf('user') > -1) {
                this.user = <IAmAUser>localStorageService.get('user');
                this.isAuthenticated = true;
            }
        }

        public authenticate(params: any): IAmAUser {
            throw new Error("AuthenticateLogic has not been set. If you are seeing this error, the code in app.run.configure.auth is not being run.")
        }

        public signOut(): void {
            this.user = { id: 0, claims: [] };
            this.isAuthenticated = false;
            this.localStorageService.remove('user');
        }
    }
    
  angular
    .module('app.auth')
    .service('authenticationManager', AuthenticationManager);

}