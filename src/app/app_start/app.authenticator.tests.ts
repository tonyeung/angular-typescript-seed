describe('Authenticator', () => {
  	var expect = chai.expect;
    beforeEach(function () {
      bard.appModule('app.config');
      bard.inject(this, "authenticator");
    });

    it('should not be null', () => {
      console.log('Authenticator should not be null');
        expect(authenticator).to.be.ok;
    });

    it('should return a user', () => {
      console.log('Authenticator should return a user');
        var user = { 'id': 0, 'claims': {} };
        expect(authenticator.authenticate(user).id === 0).to.be.true;
    });
});