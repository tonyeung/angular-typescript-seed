describe('account routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'accounts/accounts.html';
    
    beforeEach(function () {
      angular.mock.module('app.accounts'); 
      bard.inject(this, '$rootScope', '$state', '$templateCache');

      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state accounts to url /accounts ', () => {
      console.log("Accounts should map state accounts to url");
      expect($state.href('accounts', {})).to.equal('/accounts');
    });

    it('should map /accounts route to accounts View template', () => {
      console.log("Accounts should map /accounts route to accounts View template");
      expect($state.get('accounts').templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("Accounts should work with $state.go");
      $state.go('accounts');
      $rootScope.$apply();
      expect($state.is('accounts'));
    });

    it('should have title "Accounts" ', () => {
      console.log('Accounts should have title "Accounts"');
      $state.go('accounts');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Accounts');
    });
  });
});