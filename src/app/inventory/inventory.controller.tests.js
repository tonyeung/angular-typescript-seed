describe('Inventory Controller', () => {
  var expect = chai.expect;
  beforeEach(function () {
    angular.mock.module('app.inventory');
    bard.inject(this, '$controller', '$rootScope', '$timeout');
    controller = $controller('InventoryController', { $timeout: $timeout });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function () {
    expect(controller).to.be.ok;
  });

  it('should have a non null gridOptions property', () => {
    console.log("should have a non null gridOptions property");
    expect(controller.gridOptions).to.be.ok;
  });
});