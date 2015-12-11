describe('inventory routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'inventory/inventory.html';
    beforeEach(module('app'));
    
    beforeEach(function () {
      module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$rootScope', '$state', '$templateCache', 'AuthenticationManagerFactory');
      
      $templateCache.put(view, '');
      authMgr = AuthenticationManagerFactory(function () { return { id: 1 }; });
      authMgr.authenticate();
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state inventory to url /inventory ', function () {
      console.log("inventory should map state inventory to url");
      expect($state.href('inventory', {})).to.equal('/inventory');
    });

    it('should map /inventory route to inventory View template', function () {
      console.log("inventory should map /inventory route to inventory View template");
      expect($state.get('inventory').templateUrl).to.equal(view);
    });

    it('should work with $state.go', function () {
      console.log("inventory should work with $state.go");
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.is('inventory'));
    });
    
    it('should have title "inventory" ', function () {
      console.log('inventory should have title "inventory"');
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Inventory');
    });
  });
});