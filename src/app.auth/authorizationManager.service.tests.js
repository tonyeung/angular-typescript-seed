describe('authorization manager', () => {
  	var expect = chai.expect;

    beforeEach(function () {
      angular.mock.module('app.auth');
      bard.inject(this, 'authorizationManager', 'authenticationManager');
    });

    it('should not be null', () => {
        console.log('should not be null');

        expect(authorizationManager).to.be.ok;
    });

    it('should throw an error if authorize logic has not been set', () => {
        console.log('should return true if the user is Authenticated and Authorized');
        expect(authorizationManager.authorize).to.throw(Error);
    });
});