namespace app.auth {
  'use strict';
  
    export interface IHashPasswords {
        hash(password: string): string;
    }
}
