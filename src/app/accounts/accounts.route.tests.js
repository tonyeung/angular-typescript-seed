describe('account routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'accounts/accounts.html';

    beforeEach(function () {
      module('app');
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache');
      
      $templateCache.put(view, '');
    });
    
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state accounts to url /accounts ', function () {
      expect($state.href('accounts', {})).to.equal('/accounts');
    });

    it('should map /accounts route to accounts View template', function () {
      expect($state.get('accounts').templateUrl).to.equal(view);
    });

    it('of accounts should work with $state.go', function () {
      $state.go('accounts');
      $rootScope.$apply();
      expect($state.is('accounts'));
    });
  });
});