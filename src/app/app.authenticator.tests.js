describe('Authenticator factory', function () {
  	var expect = chai.expect;
  
    beforeEach(function () {
      module('app');
    });

    it('should not be null', inject(function (Authenticator) {
        var service = Authenticator;
        expect(service).to.be.ok;
    }));

    it('should return a user', inject(function (Authenticator) {
        var user = Authenticator.authenticate();
        expect(user).to.be.ok;
    }));
});