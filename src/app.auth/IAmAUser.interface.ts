namespace app.auth {
  'use strict';
  
    export interface IAmAUser {
        id: number;
        claims: {};
        passwordHash: string;
        email: string;        
    }
}
