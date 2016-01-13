describe('authentication manager', () => {
  	var expect = chai.expect;
    beforeEach(function () {
        angular.mock.module('app.auth');
        bard.inject(this, '$rootScope', '$q', '$timeout', 'authenticationManager');
    });
    
    it('should not be null',  () => {
        console.log('authentication manager should not be null');

        expect(authenticationManager).to.be.ok;
    });

    it('should error if authentication logic is not passed in',  () => {
        console.log('authentication manager should error if authentication logic is not passed in');
        
        expect(authenticationManager.authenticate).to.throw(Error);
    });
    
    describe('when authenticated', () => {
        
        beforeEach(function () {
            authenticationManager.authenticator = {
              authenticate: () => {
                  var deferred = $q.defer();
                  this.user = { id: 1, claims: [] };
                  deferred.resolve(this.user);
                   
                  return deferred.promise; 
                }
            };
        });
        
        it('should store the authentication logic', (done) => {
            console.log('authentication manager should store the authentication logic');

            authenticationManager.authenticate().then(
              (user) => {
                expect(user.id === 1).to.be.true;
                done();
              }
            ); 
            $rootScope.$digest();
        });
    
        it('should return a user after calling authenticate()',  (done) => {
            console.log('should return a user after calling authenticate()');
            
            authenticationManager.authenticate().then(
              (user) => {
                expect(user.id === 1).to.be.true;
                done();
              }
            );
            $rootScope.$digest();
        });
    
        it('should have a user after authenticating',  (done) => {
            console.log('authentication manager should have a user after authenticating');
    
            authenticationManager.authenticate().then(
              (user) => {
                expect(authenticationManager.user.id === 1).to.be.true;
                done();
              }
            );
            $rootScope.$digest();
        });
    
        it('should return true if a user is already authenticated',  (done) => {
            console.log('authentication manager should return true if a user is already authenticated');
            
            authenticationManager.authenticate().then(
              (user) => {
                expect(authenticationManager.isAuthenticated).to.be.true;
                done();
              }
            );
            $rootScope.$digest();
        });
    
        it('should return false if a user authenticates and then signs out',  (done) => {
            console.log('authentication manager should return true if a user authenticates and then signs out');
            
            authenticationManager.authenticate().then(
              (user) => {
                authenticationManager.signOut();
        
                expect(authenticationManager.isAuthenticated).to.be.false;
                done();
              }
            );
            $rootScope.$digest();
        });
    })
});