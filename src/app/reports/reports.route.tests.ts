describe('reports routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'reports/reports.html';
    
    beforeEach(function () {
      angular.mock.module('app')
      angular.mock.module(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'authenticationManager');

      $templateCache.put(view, '');
      authenticationManager.isAuthenticated = true;
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state reports to url /reports ', () => {
      console.log("reports should map state reports to url");
      expect($state.href('reports', {})).to.equal('/reports');
    });

    it('should map /reports route to reports View template', () => {
      console.log("reports should map /reports route to reports View template");
      expect($state.get('reports').templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("reports should work with $state.go");
      $state.go('reports');
      $rootScope.$apply();
      expect($state.is('reports'));
    });
    
    it('should have title "reports" ', () => {
      console.log('reports should have title "reports"');
      $state.go('reports');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Reports');
    });
  });
});