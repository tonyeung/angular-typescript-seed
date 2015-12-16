describe('inventory routes', () => {
  var expect = chai.expect;
  describe('state', () => {
    var view = 'inventory/inventory.html';
    
    beforeEach(function () {
      angular.mock.module('app.inventory');
      bard.inject(this, '$rootScope', '$state', '$templateCache');

      $templateCache.put(view, '');
    });
    
    bard.verifyNoOutstandingHttpRequests();

    it('should map state inventory to url /inventory ', () => {
      console.log("inventory should map state inventory to url");
      expect($state.href('inventory', {})).to.equal('/inventory');
    });

    it('should map /inventory route to inventory View template', () => {
      console.log("inventory should map /inventory route to inventory View template");
      expect($state.get('inventory').templateUrl).to.equal(view);
    });

    it('should work with $state.go', () => {
      console.log("inventory should work with $state.go");
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.is('inventory'));
    });
    
    it('should have title "inventory" ', () => {
      console.log('inventory should have title "inventory"');
      $state.go('inventory');
      $rootScope.$apply();
      expect($state.current.data.pageTitle).to.equal('Inventory');
    });
  });
});