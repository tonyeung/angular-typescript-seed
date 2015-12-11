describe('settings routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'settings/settings.html';
    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'AuthenticationManagerFactory');
      
      $templateCache.put(view, '');
      authMgr = AuthenticationManagerFactory(function () { return { id: 1 }; });
      authMgr.authenticate();
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state settings to url /settings ', function () {
      console.log("settings should map state settings to url");
      expect($state.href('settings', {})).to.equal('/settings');
    });

    it('should map /settings route to settings View template', function () {
      console.log("settings should map /settings route to settings View template");
      expect($state.get('settings').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("settings should work with $state.go");
      $state.go('settings');
      $rootScope.$apply();
      expect($state.is('settings'));
    });
    
    it('should have title "settings" ', function () {
      console.log('settings should have title "settings"');
      $state.go('settings');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Settings');
    });
  });
});