describe('Login Controller', () => {
  var expect = chai.expect;
  var controller: app.IControlLogin;
  var AuthenticationManager: app.auth.IManageAuthentication;
  beforeEach(function() {
    angular.mock.module('app');
    angular.mock.module('app.auth');
    angular.mock.module(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
    bard.inject(this, '$controller', '$rootScope', '$httpBackend', 'authenticationManager');
    controller = $controller('LoginController', { authenticationManager: authenticationManager });
    AuthenticationManager = authenticationManager;
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.ok;
  });
  
  describe('when authenticating', () => {
    
    beforeEach(function() {
      AuthenticationManager.authenticatorLogic = (() => {
        return { id: 1, claims: []};
      });
    });
  
    it('should cause IsAuthenticated on authenticationManager to be true', () => {
      console.log('should cause IsAuthenticated on authenticationManager to be true');
  
      $httpBackend.whenGET("home/dashboard.html").respond({});
      $httpBackend.expectGET("home/dashboard.html");
      controller.login('username', 'password');
  
      expect(AuthenticationManager.isAuthenticated).to.be.true;
      $httpBackend.flush();
    });
  });
  
  describe('when authentication fails', () => {
    
    beforeEach(function() {
      AuthenticationManager.authenticatorLogic = (() => {
        return { id: 0, claims: []};
      });
    });
    
    it('should leave IsAuthenticated false', () => {
      console.log('should leave IsAuthenticated false');
  
      controller.login('username', 'password');
  
      expect(AuthenticationManager.isAuthenticated).to.be.false;
    });
    
    it('should set invalid to true', () => {
      console.log('should set invalid to true');
  
      controller.login('username', 'password');
  
      expect(controller.invalid).to.be.true;
    });
  });
});