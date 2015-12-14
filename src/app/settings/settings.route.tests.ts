// describe('settings routes', () => {
//   var expect = chai.expect;
//   describe('state', () => {
//     var view = 'settings/settings.html';
//     
//     beforeEach(function () {
//       bard.appModule('app')
//       bard.appModule(($urlRouterProvider) => { $urlRouterProvider.deferIntercept(); });
//       bard.inject(this, '$rootScope', '$state', '$templateCache', 'authenticationManager');
// 
//       $templateCache.put(view, '');
//       authenticationManager.isAuthenticated = true;
//     });
//     
//     bard.verifyNoOutstandingHttpRequests();
// 
//     it('should map state settings to url /settings ', () => {
//       console.log("settings should map state settings to url");
//       expect($state.href('settings', {})).to.equal('/settings');
//     });
// 
//     it('should map /settings route to settings View template', () => {
//       console.log("settings should map /settings route to settings View template");
//       expect($state.get('settings').templateUrl).to.equal(view);
//     });
// 
//     it('should work with $state.go', () => {
//       console.log("settings should work with $state.go");
//       $state.go('settings');
//       $rootScope.$apply();
//       expect($state.is('settings'));
//     });
//     
//     it('should have title "settings" ', () => {
//       console.log('settings should have title "settings"');
//       $state.go('settings');
//       $rootScope.$apply();
//       expect($state.current.data.pageTitle).to.equal('Settings');
//     });
//   });
// });