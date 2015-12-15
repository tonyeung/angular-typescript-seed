describe('Login Controller', () => {
  var expect = chai.expect;
  var controller: app.IControlLogin;
  var AuthenticationManager: app.auth.IManageAuthentication;
  beforeEach(function() {
    angular.mock.module('app');
    angular.mock.module('app.auth');
    angular.mock.module(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
    bard.inject(this, '$controller', '$rootScope', 'authenticationManager');
    controller = $controller('LoginController', { authenticationManager: authenticationManager});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function () {
    expect(controller).to.be.ok;
  });
    
  it('should return a user when login() is called', () => {
    console.log('should return a user when login() is called');
    var user = controller.login('username', 'password');
    
    expect(user).to.be.ok;
  });
});