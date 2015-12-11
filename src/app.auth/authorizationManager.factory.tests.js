describe('authorization manager', function () {
  	var expect = chai.expect;
  
    beforeEach(function () {
      module('app.auth');
    });

    it('should not be null', inject(function (AuthorizationManagerFactory) {
        console.log('should not be null');
        var authorizationManager = AuthorizationManagerFactory(function () { false; });
        
        expect(authorizationManager).to.be.ok;
    }));

    it('should return false if the user is not authenticated', inject(function (AuthorizationManagerFactory) {
        console.log('should return false if the user is not authenticated');
        var authorizationManager = AuthorizationManagerFactory(function () { return true; });
        var authorized = authorizationManager.authorize();            
        
        expect(authorized).to.be.false;
    }));
    
    it('should return true if the user is Authenticated and Authorized', inject(function (AuthorizationManagerFactory, AuthenticationManagerFactory) {
        console.log('should return true if the user is Authenticated and Authorized');
        var authenticationManager = AuthenticationManagerFactory(function () { return { id: 1, claims:[] }; });
        var authorizationManager = AuthorizationManagerFactory(function () { return true; });
        authenticationManager.authenticate();
        var authorized = authorizationManager.authorize();
        
        expect(authorized).to.be.true;
    }));
    
    it('should return false if the user is Authenticated and not Authorized', inject(function (AuthorizationManagerFactory, AuthenticationManagerFactory) {
        console.log('should return true if the user is Authenticated and Authorized');
        var authenticationManager = AuthenticationManagerFactory(function () { return { id: 1, claims:[] }; });
        var authorizationManager = AuthorizationManagerFactory(function () { return false; });
        authenticationManager.authenticate();
        var authorized = authorizationManager.authorize();
        
        expect(authorized).to.be.false;
    }));
});