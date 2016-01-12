namespace app.auth {
  'use strict';
  
  export interface IUserStore {
    getByUsername(...args: any[]): IAmAUser;
  }
  
  export interface IUserPasswordStore extends IUserStore {
    setPasswordHash(user: IAmAUser, hash: string): void;
    getPasswordHash(user: IAmAUser): string;    
  }
}