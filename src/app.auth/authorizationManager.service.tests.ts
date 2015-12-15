describe('authorization manager', () => {
  	var expect = chai.expect;
    var AuthorizationManager: app.auth.IManageAuthorization;
    var AuthenticationManager: app.auth.IManageAuthentication;

    beforeEach(function () {
      angular.mock.module('app.auth');
      bard.inject(this, 'authorizationManager', 'authenticationManager');
      AuthorizationManager = authorizationManager;
      AuthenticationManager = authenticationManager;
    });

    it('should not be null', () => {
        console.log('should not be null');

        expect(AuthorizationManager).to.be.ok;
    });

    it('should throw an error if authorize logic has not been set', () => {
        console.log('should return true if the user is Authenticated and Authorized');
        expect(AuthorizationManager.authorize).to.throw(Error);
    });
});