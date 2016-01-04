describe('Authorizer factory', () => {
  	var expect = chai.expect;
    beforeEach(function () {
      bard.appModule('app.config');
      bard.appModule('app.auth');
      bard.inject(this, 'authorizer', 'authenticationManager');
    });

    it('should not be null', () => {
        expect(authorizer).to.be.ok;
    });

    it('should return true', () => {
        expect(authorizer.authorize(authenticationManager)).to.be.true;
    });
});