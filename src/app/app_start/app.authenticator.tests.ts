describe('Authenticator', () => {
  	var expect = chai.expect;
	  var Authenticator: app.IAmAuthenticationLogic;
    beforeEach(function () {
      angular.mock.module('app');
      bard.inject(this, "authenticator");
	    Authenticator = authenticator;
    });

    it('should not be null', () => {
      console.log('Authenticator should not be null');
        expect(Authenticator).to.be.ok;
    });

    it('should return a user', () => {
      console.log('Authenticator should return a user');
        var user = { 'id': 0, 'claims': {} };
        expect(Authenticator.authenticate(user).id === 0).to.be.true;
    });
});