describe('Authorizer factory', () => {
  	var expect = chai.expect;
    var Authorizer;
    var AuthenticationManager: app.auth.IManageAuthentication;
    beforeEach(function () {
      bard.appModule('app.config');
      bard.appModule('app.auth');
      bard.inject(this, 'authorizer', 'authenticationManager');
      Authorizer = authorizer;
      AuthenticationManager = authenticationManager;
    });

    it('should not be null', () => {
        expect(Authorizer).to.be.ok;
    });

    it('should return true', () => {
        expect(Authorizer.authorize(AuthenticationManager)).to.be.true;
    });
});