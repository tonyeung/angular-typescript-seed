describe('authentication manager', () => {
  	var expect = chai.expect;
    beforeEach(function () {
        angular.mock.module('app.auth');
        bard.inject(this, 'authenticationManager');
    });
    
    it('should not be null',  () => {
        console.log('authentication manager should not be null');

        expect(authenticationManager).to.be.ok;
    });

    it('should error if authentication logic is not passed in',  () => {
        console.log('authentication manager should error if authentication logic is not passed in');
        
        expect(authenticationManager.authenticate).to.throw(Error);
    });
    
    describe('when authenticated', () => {
        
        beforeEach(function () {
            authenticationManager.authenticatorLogic = function() { 
                this.user = { id: 1, claims: [] }; 
                return this.user 
            };
        });
        
        it('should store the authentication logic', () => {
            console.log('authentication manager should store the authentication logic');
            
            expect(authenticationManager.authenticate().id === 1).to.be.true;
        });
    
        it('should return a user after calling authenticate()',  () => {
            console.log('should return a user after calling authenticate()');
            
            var user = authenticationManager.authenticate();
    
            expect(user.id === 1).to.be.true;
        });
    
        it('should have a user after authenticating',  () => {
            console.log('authentication manager should have a user after authenticating');
    
            authenticationManager.authenticate();
    
            expect(authenticationManager.user.id === 1).to.be.true;
        });
    
        it('should return true if a user is already authenticated',  () => {
            console.log('authentication manager should return true if a user is already authenticated');
            
            authenticationManager.authenticate();
    
            expect(authenticationManager.isAuthenticated).to.be.true;
        });
    
        it('should return false if a user authenticates and then signs out',  () => {
            console.log('authentication manager should return true if a user authenticates and then signs out');
            
            authenticationManager.authenticate();
            authenticationManager.signOut();
    
            expect(authenticationManager.isAuthenticated).to.be.false;
        });
    })
});