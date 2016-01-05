// describe('Login Controller', () => {
//   var expect = chai.expect;
//   var controller;
//     
//   beforeEach(function() {
//     angular.mock.module('app.accounts');
//     bard.inject(this, '$controller', '$rootScope', 'authenticationManager');
//     controller = $controller('LoginController', { authenticationManager: authenticationManager });
//     $rootScope.$apply();
//   });
// 
//   bard.verifyNoOutstandingHttpRequests();
// 
//   it('should exist', function() {
//     expect(controller).to.be.ok;
//   });
//   
//   describe('when authentication fails', () => {    
//     beforeEach(function() {
//       
//       authenticationManager.authenticatorLogic = (() => {
//         return { id: 0, claims: []};
//       });
//     });
//     
//     bard.verifyNoOutstandingHttpRequests();
//     
//     it('should leave IsAuthenticated false', () => {
//       console.log('should leave IsAuthenticated false');
//   
//       controller.login('username', 'password');
//   
//       expect(authenticationManager.isAuthenticated).to.be.false;
//     });
//     
//     it('should set invalid to true', () => {
//       console.log('should set invalid to true');
//   
//       controller.login('username', 'password');
//   
//       expect(controller.invalid).to.be.true;
//     });
//   });
//     
//   describe('when authenticating', () => {    
//     beforeEach(function() {
//       
//       authenticationManager.authenticatorLogic = (() => {
//         return { id: 1, claims: []};
//       });
//       
//     });
//   
//     it('should cause IsAuthenticated on authenticationManager to be true', () => {
//       console.log('should cause IsAuthenticated on authenticationManager to be true');
//   
//       controller.login('username', 'password');
//   
//       expect(authenticationManager.isAuthenticated).to.be.true;
//     });
//   });
// });