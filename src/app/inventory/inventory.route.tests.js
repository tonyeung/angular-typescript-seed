describe('inventory routes', function () {
  var expect = chai.expect;
  describe('state', function () {
    var view = 'inventory/inventory.html';

    beforeEach(function () {
      module('app');
	    module(function($urlRouterProvider) { $urlRouterProvider.deferIntercept(); });
      bard.inject(this, '$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state inventory to url /inventory', function () {
      expect($state.href('inventory', {})).to.equal('/inventory');
    });

    it('should map /inventory route to inventory View template', function () {
      expect($state.get('inventory').templateUrl).to.equal(view);
    });

    it('of inventory should work with $state.go', function () {
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.is('inventory'));
    });
    
    it('should have title "inventory" ', function () {
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Inventory');
    });
  });
});