describe('authorization manager', function () {
  	var expect = chai.expect;

    beforeEach(function () {
      bard.appModule('app.auth');
      bard.inject(this, 'authorizationManager', 'authenticationManager');
    });

    it('should not be null', (done) => {
        console.log('should not be null');

        expect(authorizationManager).to.be.ok;
    });

    it('should throw an error if authorize logic has not been set', (done) => {
        console.log('should return true if the user is Authenticated and Authorized');
        expect(authorizationManager.authorize()).throws;
    });
});