describe('account routes', function () {
  console.log("account routes");
  var expect = chai.expect;
  describe('state', function () {
    var view = 'accounts/accounts.html';    

    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache');
      
      $templateCache.put(view, '');
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state accounts to url /accounts ', function () {
      console.log("Accounts should map state accounts to url");
      expect($state.href('accounts', {})).to.equal('/accounts');
    });

    it('should map /accounts route to accounts View template', function () {
      console.log("Accounts should map /accounts route to accounts View template");
      expect($state.get('accounts').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("Accounts should work with $state.go");
      $state.go('accounts');
      $rootScope.$apply();
      expect($state.is('accounts'));
    });
    
    it('should have title "Accounts" ', function () {
      console.log('Accounts should have title "Accounts"');
      $state.go('accounts');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Accounts');
    });
  });
});