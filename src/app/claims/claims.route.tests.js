describe('claim routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'claims/claims.html';
    
    beforeEach(function () {
      angular.mock.module('app.claims')
      bard.inject(this, '$rootScope', '$state', '$templateCache');

      $templateCache.put(view, '');
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state claims to url /claims ', () => {
      console.log("claims should map state claims to url");
      expect($state.href('claims', {})).to.equal('/claims');
    });

    it('should map /claims route to claims View template', () => {
      console.log("claims should map /claims route to claims View template");
      expect($state.get('claims').views[''].templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("claims should work with $state.go");
      $state.go('claims');
      $rootScope.$apply();
      expect($state.is('claims'));
    });
    
    it('should have title "claims" ', () => {
      console.log('claims should have title "claims"');
      $state.go('claims');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Claims');
    });
  });
});