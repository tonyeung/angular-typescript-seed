describe('reports routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'reports/reports.html';
    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'AuthenticationManagerFactory');
      
      $templateCache.put(view, '');
      authMgr = AuthenticationManagerFactory(function () { return { id: 1 }; });
      authMgr.authenticate();
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state reports to url /reports ', function () {
      console.log("reports should map state reports to url");
      expect($state.href('reports', {})).to.equal('/reports');
    });

    it('should map /reports route to reports View template', function () {
      console.log("reports should map /reports route to reports View template");
      expect($state.get('reports').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("reports should work with $state.go");
      $state.go('reports');
      $rootScope.$apply();
      expect($state.is('reports'));
    });
    
    it('should have title "reports" ', function () {
      console.log('reports should have title "reports"');
      $state.go('reports');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Reports');
    });
  });
});