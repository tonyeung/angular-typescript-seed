describe('Header Controller', () => {
  var expect = chai.expect;
  var controller;
    
  beforeEach(function() {
    angular.mock.module('app.layout');
    bard.inject(this, '$controller', '$rootScope', '$mdSidenav');
    sinon.spy($mdSidenav('left'), 'toggle');
    controller = $controller('HeaderController', { $mdSidenav: $mdSidenav });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(controller).to.be.ok;
  });
  
  it('should toggle $mdSidenav when called', function() {
    controller.openLeftMenu();    
    expect($mdSidenav('left').toggle.calledOnce);
  });
});