describe('dashboard routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'home/dashboard.html';
    
    beforeEach(function () {
      angular.mock.module('app')
      angular.mock.module(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'authenticationManager');

      $templateCache.put(view, '');
      authenticationManager.isAuthenticated = true;
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state dashboard to url / ', () => {
      console.log("dashboard should map state dashboard to url");
      expect($state.href('dashboard', {})).to.equal('/');
    });

    it('should map /dashboard route to dashboard View template', () => {
      console.log("dashboard should map /dashboard route to dashboard View template");
      expect($state.get('dashboard').templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("dashboard should work with $state.go");
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
    
    it('should have title "dashboard" ', () => {
      console.log('dashboard should have title "Dashboard"');
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Dashboard');
    });
  });
});