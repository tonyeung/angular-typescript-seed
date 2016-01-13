describe('Authorizer', () => {
  	var expect = chai.expect;
    beforeEach(function () {
      bard.appModule('app.config', 'app.auth', 'app.data');
      bard.inject(this, 'authorizer');
    });

    it('should not be null', () => {
        expect(authorizer).to.be.ok;
    });

    it('should return true', () => {
        expect(authorizer.authorize('foo')).to.be.true;
    });
});