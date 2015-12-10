describe('authentication manager', function () {
  	var expect = chai.expect;
  
    beforeEach(function () {
      module('app.auth');
    });

    it('should not be null', inject(function (AuthenticationManagerFactory) {
        console.log('authentication manager should not be null');
        var authenticationManager = AuthenticationManagerFactory(function () { return {}; });
        expect(authenticationManager).to.be.ok;
    }));

    it('should store the authentication logic', inject(function (AuthenticationManagerFactory) {
        console.log('authentication manager should store the authentication logic');
        AuthenticationManagerFactory(function () { return {}; });
        var authenticationManager = AuthenticationManagerFactory();
        expect(authenticationManager.authenticateLogic).to.be.ok;
    }));

    it('should have a user after authenticating', inject(function (AuthenticationManagerFactory) {
        console.log('authentication manager should have a user after authenticating');
        var authenticationManager = AuthenticationManagerFactory(function () { console.log("called authlogic"); return { id: 0 }; });
        var user = authenticationManager.authenticate();
        
        expect(user).to.be.ok;
        expect(authenticationManager.user).to.be.ok;
    }));

    it('should return true if a user is already authenticated', inject(function (AuthenticationManagerFactory) {
        console.log('authentication manager should return true if a user is already authenticated');
        var authenticationManager = AuthenticationManagerFactory(function () { return { id: 1 }; });
        
        authenticationManager.authenticate();
        var authenticated = authenticationManager.isAuthenticated;
        
        expect(authenticated).to.be.true;
    }));

    it('should return true if a user authenticates and then signs out', inject(function (AuthenticationManagerFactory) {
        console.log('authentication manager should return true if a user authenticates and then signs out');
        var authenticationManager = AuthenticationManagerFactory(function () { return { id: 1 }; });
        authenticationManager.authenticate();
        authenticationManager.signOut();
        var authenticated = authenticationManager.isAuthenticated;

        expect(authenticated).to.be.false;
    }));
});