describe('Authenticator', () => {
  	var expect = chai.expect;
    beforeEach(function () {
      bard.appModule('app.config', 'app.data');
      bard.inject(this, '$rootScope', '$httpBackend', 'authenticator');
    });

    it('should not be null', () => {
      console.log('Authenticator should not be null');
        expect(authenticator).to.be.ok;
    });

    it('should return a user', (done) => {
      console.log('Authenticator should return a user');
        $httpBackend.expectGET('http://localhost:8000/users')
          .respond([{
              id: 0
          }]);
          
        authenticator.authenticate('foo', 'bar').then(
          (user) => {
            expect(user.id === 0).to.be.true;
            done();
          }
        ); 
        
        $rootScope.$digest();
        $httpBackend.flush();
    });
});