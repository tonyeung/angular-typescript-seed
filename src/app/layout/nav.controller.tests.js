describe('Nav Controller', () => {
  var expect = chai.expect;
  var controller;
    
  beforeEach(function() {
    angular.mock.module('app.layout', 'app.home');
    bard.inject(this, '$controller', '$rootScope', '$mdSidenav', '$state');
    sinon.spy($mdSidenav('left'), 'close');
    sinon.spy($mdSidenav('left'), 'open');
    sinon.spy($state, 'go');
    controller = $controller('NavController', { $mdSidenav: $mdSidenav, $state: $state });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(controller).to.be.ok;
  });
  
  it('should have property current', function() {
    expect(controller.current).to.exist;
  });
  
  it('should call $state.go when route is called', function() {
    controller.route('dashboard');
    expect($state.go.calledOnce);
  });
  
  it('should call $mdSidenav.close when route is called', function() {
    controller.route('dashboard');
    expect($mdSidenav('left').close.calledOnce);
  });
  
  it('should toggle $mdSidenav when called', function() {
    controller.closeLeftMenu();    
    expect($mdSidenav('left').toggle.calledOnce);
  });
});