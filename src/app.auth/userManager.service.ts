namespace app.auth {
  'use strict';
    // should be resource/data service
    export interface IManageUsers {
		  findByName(username: string): IAmAUser;
      checkPassword(user: IAmAUser, password: string): boolean;
    }

    class UserManager implements IManageUsers {
        constructor(private userStore: IUserStore,
                    private passwordHasher: IHashPasswords){};
        
        public findByName(username: string): IAmAUser {
          return this.userStore.getByUsername(username);
        }
        
        public checkPassword(user: IAmAUser, password: string): boolean {
          if (!this.passwordHasher) {
            throw new Error('no password hasher was passed in, please create a password hasher that implements IHashPasswords');
          }
          
          var hash = this.passwordHasher.hash(password);
          if (hash ===  user.passwordHash) {
            return true;
          }
          
          return false;
        }
    }

  angular
    .module('app.auth')
    .service('userManager', UserManager);
}