describe('authentication manager', function () {
  	var expect = chai.expect;

    beforeEach(function () {
        bard.appModule('app.auth');
        bard.inject(this, 'authenticationManager');
    });

    it('should not be null',  (done) => {
        console.log('authentication manager should not be null');

        var authenticationManager = authenticationManager(() => { return {}; });

        expect(authenticationManager).to.be.ok;
    });

    it('should store the authentication logic',  (done) => {
        console.log('authentication manager should store the authentication logic');

        authenticationManager.authenticate = () => { return 1; };

        expect(authenticationManager.authenticate() === 1).to.be.true;
    });

    it('should return a user after calling authenticate()',  (done) => {
        console.log('should return a user after calling authenticate()');

        authenticationManager.authenticate = () => { return { id: 1 }; };
        var user = authenticationManager.authenticate();

        expect(user.id === 1).to.be.true;
    });

    it('should have a user after authenticating',  (done) => {
        console.log('authentication manager should have a user after authenticating');

        authenticationManager.authenticate = () => { return { id: 1 }; };
        authenticationManager.authenticate();

        expect(authenticationManager.user().id === 1).to.be.true;
    });

    it('should return true if a user is already authenticated',  (done) => {
        console.log('authentication manager should return true if a user is already authenticated');
        authenticationManager.authenticate = () => { return { id: 1 }; };
        authenticationManager.authenticate();

        expect(authenticationManager.isAuthenticated()).to.be.true;
    });

    it('should return true if a user authenticates and then signs out',  (done) => {
        console.log('authentication manager should return true if a user authenticates and then signs out');
        authenticationManager.authenticate = () => { return { id: 1 }; };
        authenticationManager.authenticate();
        authenticationManager.signOut();

        expect(authenticationManager.isAuthenticated()).to.be.false;
    });

    it('should error if authentication logic is not passed in',  (done) => {
        console.log('authentication manager should error if authentication logic is not passed in');
        authenticationManager.authenticate();

        expect(authenticationManager.isAuthenticated()).throws;
    });
});