describe('dashboard routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'home/dashboard.html';

    beforeEach(function () {
      module('app');
	    module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state dashboard to url / ', function () {
      console.log($state.href('dashboard', {}));
      expect($state.href('dashboard', {})).to.equal('/');
    });

    it('should map /dashboard route to dashboard View template', function () {
      expect($state.get('dashboard').templateUrl).to.equal(view);
    });

    it('of dashboard should work with $state.go', function () {
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
  });
});