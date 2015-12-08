describe('claim routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'claims/claims.html';

    beforeEach(function () {
      module('app');
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache');
      
      $templateCache.put(view, '');
    });
    
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state claims to url /claims ', function () {
      expect($state.href('claims', {})).to.equal('/claims');
    });

    it('should map /claims route to claims View template', function () {
      expect($state.get('claims').templateUrl).to.equal(view);
    });

    it('of claims should work with $state.go', function () {
      $state.go('claims');
      $rootScope.$apply();
      expect($state.is('claims'));
    });
    
    it('should have title "Claims" ', function () {
      $state.go('claims');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Claims');
    });
  });
});