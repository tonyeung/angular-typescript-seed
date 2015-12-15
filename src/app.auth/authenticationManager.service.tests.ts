describe('authentication manager', () => {
  	var expect = chai.expect;
    var AuthenticationManager: app.auth.IManageAuthentication;
    beforeEach(function () {
        angular.mock.module('app.auth');
        bard.inject(this, 'authenticationManager');
        AuthenticationManager = authenticationManager;
    });
    
    it('should not be null',  () => {
        console.log('authentication manager should not be null');

        expect(AuthenticationManager).to.be.ok;
    });

    it('should store the authentication logic', () => {
        console.log('authentication manager should store the authentication logic');

        AuthenticationManager.authenticate = () => { return { id: 1, claims: []}; };

        expect(AuthenticationManager.authenticate().id === 1).to.be.true;
    });

    it('should return a user after calling authenticate()',  () => {
        console.log('should return a user after calling authenticate()');

        AuthenticationManager.authenticate = function() { return { id: 1, claims: []}; };
        var user = AuthenticationManager.authenticate();

        expect(user.id === 1).to.be.true;
    });

    it('should have a user after authenticating',  () => {
        console.log('authentication manager should have a user after authenticating');

        AuthenticationManager.authenticate = function() { 
            this.user = { id: 1, claims: [] }; 
            return this.user 
        };
        AuthenticationManager.authenticate();

        expect(AuthenticationManager.user.id === 1).to.be.true;
    });

    it('should return true if a user is already authenticated',  () => {
        console.log('authentication manager should return true if a user is already authenticated');

        AuthenticationManager.authenticate = function() { 
            this.isAuthenticated = true;
            this.user = { id: 1, claims: [] }; 
            return this.user 
        };
        AuthenticationManager.authenticate();

        expect(AuthenticationManager.isAuthenticated).to.be.true;
    });

    it('should return false if a user authenticates and then signs out',  () => {
        console.log('authentication manager should return true if a user authenticates and then signs out');
        
        AuthenticationManager.authenticate = function() { 
            this.isAuthenticated = true;
            this.user = { id: 1, claims: [] }; 
            return this.user 
        };
        AuthenticationManager.authenticate();
        AuthenticationManager.signOut();

        expect(AuthenticationManager.isAuthenticated).to.be.false;
    });

    it('should error if authentication logic is not passed in',  () => {
        console.log('authentication manager should error if authentication logic is not passed in');
        
        expect(AuthenticationManager.authenticate).to.throw(Error);
    });
});