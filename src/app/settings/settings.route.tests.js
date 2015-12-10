describe('settings routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'settings/settings.html';

    beforeEach(function () {
      module('app');
	    module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state settings to url /settings ', function () {
      expect($state.href('settings', {})).to.equal('/settings');
    });

    it('should map /settings route to settings View template', function () {
      expect($state.get('settings').templateUrl).to.equal(view);
    });

    it('of settings should work with $state.go', function () {
      $state.go('settings');
      $rootScope.$apply();
      expect($state.is('settings'));
    });
    
    it('should have title "settings" ', function () {
      $state.go('settings');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Settings');
    });
  });
});