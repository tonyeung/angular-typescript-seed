describe('Authenticator', function () {
  	var expect = chai.expect;

    beforeEach(function () {
      bard.appModule('app');
      bard.inject(this, "authenticator");
    });

    it('should not be null', (done) => {
      console.log('Authenticator should not be null');
        expect(authenticator).to.be.ok;
    });

    it('should return a user', (done) => {
      console.log('Authenticator should return a user');
        expect(authenticator()).to.be.ok;
    });
});