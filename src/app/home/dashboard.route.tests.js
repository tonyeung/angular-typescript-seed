describe('dashboard routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'home/dashboard.html';
    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'AuthenticationManagerFactory');
      
      $templateCache.put(view, '');
      authMgr = AuthenticationManagerFactory(function () { return { id: 1 }; });
      authMgr.authenticate();
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state dashboard to url / ', function () {
      console.log("dashboard should map state dashboard to url");
      expect($state.href('dashboard', {})).to.equal('/');
    });

    it('should map /dashboard route to dashboard View template', function () {
      console.log("dashboard should map /dashboard route to dashboard View template");
      expect($state.get('dashboard').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("dashboard should work with $state.go");
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
    
    it('should have title "dashboard" ', function () {
      console.log('dashboard should have title "Dashboard"');
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Dashboard');
    });
  });
});