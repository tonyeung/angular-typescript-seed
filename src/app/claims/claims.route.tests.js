describe('claim routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'claims/claims.html';
    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'AuthenticationManagerFactory');
      
      $templateCache.put(view, '');
      authMgr = AuthenticationManagerFactory(function () { return { id: 1 }; });
      authMgr.authenticate();
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state claims to url /claims ', function () {
      console.log("claims should map state claims to url");
      expect($state.href('claims', {})).to.equal('/claims');
    });

    it('should map /claims route to claims View template', function () {
      console.log("claims should map /claims route to claims View template");
      expect($state.get('claims').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("claims should work with $state.go");
      $state.go('claims');
      $rootScope.$apply();
      expect($state.is('claims'));
    });
    
    it('should have title "claims" ', function () {
      console.log('claims should have title "claims"');
      $state.go('claims');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Claims');
    });
  });
});