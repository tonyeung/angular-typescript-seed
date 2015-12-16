describe('login routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'accounts/login.html';
    
    beforeEach(function () {
      angular.mock.module('app.accounts');
      angular.mock.module(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'authenticationManager');

      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state login to url /login ', () => {
      console.log("login should map state login to url");
      expect($state.href('login', {})).to.equal('/login');
    });

    it('should map /login route to login View template', () => {
      console.log("login should map /login route to login View template");
      expect($state.get('login').templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("login should work with $state.go");
      $state.go('login');
      $rootScope.$apply();
      expect($state.is('login'));
    });

    it('should have title "login" ', () => {
      console.log('login should have title "login"');
      $state.go('login');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('login');
    });

    it.skip('should redirect to / when already logged in ', () => {
      console.log('login should have title "login"');
      authenticationManager.isAuthenticated = true;
      $state.go('login');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('dashboard');
    });
  });
});