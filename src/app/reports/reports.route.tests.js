describe('reports routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'reports/reports.html';

    beforeEach(function () {
      module('app');
	    module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state reports to url /reports ', function () {
      expect($state.href('reports', {})).to.equal('/reports');
    });

    it('should map /reports route to reports View template', function () {
      expect($state.get('reports').templateUrl).to.equal(view);
    });

    it('of reports should work with $state.go', function () {
      $state.go('reports');
      $rootScope.$apply();
      expect($state.is('reports'));
    });
    
    it('should have title "reports" ', function () {
      $state.go('reports');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Reports');
    });
  });
});