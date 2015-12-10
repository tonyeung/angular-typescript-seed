describe('authorization manager', function () {
  	var expect = chai.expect;
  
    beforeEach(function () {
      module('app.auth');
    });

    it('should not be null', inject(function (AuthorizationManager) {
        var authorizationManager = AuthorizationManager(function () { false; });
        expect(authorizationManager).to.be.ok;
    }));

    it('should return false if the user is not authenticated', inject(function (AuthorizationManager) {
        var authorizationManager = AuthorizationManager(function () { return false; });
        var authorized = authorizationManager.authorize();            
        expect(authorized).to.be.false;
    }));
});