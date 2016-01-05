describe('Nav Controller', () => {
  var expect = chai.expect;
  var controller;
    
  beforeEach(function() {
    angular.mock.module('app.layout');
    bard.inject(this, '$controller', '$rootScope', '$state');
    sinon.spy($state, 'go');
    controller = $controller('NavController', { $state: $state });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(controller).to.be.ok;
  });
  
  it('should have property current', function() {
    expect(controller.current).to.exist;
  });
  
  it('should call $state.go when called', function() {
    controller.openLeftMenu();    
    expect($state().go.calledOnce);
  });
});