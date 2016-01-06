describe('Header Controller', () => {
  var expect = chai.expect;
  var controller;
    
  beforeEach(function() {
    angular.mock.module('app.layout', 'app.home');
    bard.inject(this, '$controller', '$rootScope', '$mdSidenav', '$state');
    sinon.spy($mdSidenav('left'), 'open');
    sinon.spy($state, 'go');
    controller = $controller('HeaderController', { $state: $state, $mdSidenav: $mdSidenav });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(controller).to.be.ok;
  });
  
  it('should toggle $mdSidenav when called', function() {
    controller.openLeftMenu();    
    expect($mdSidenav('left').open.calledOnce);
  });
  
  it('should call $state.go when route is called', function() {
    controller.route('dashboard');
    expect($state.go.calledOnce);
  });
});