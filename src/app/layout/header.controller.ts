namespace app {
  export interface IControlHeader {
    openLeftMenu(): void;
    route(path: string) : void;
  }

  class HeaderController implements IControlHeader {

    constructor(private $rootScope, private $state: ng.ui.IStateService, private $mdSidenav: ng.material.ISidenavService) {}

    openLeftMenu(): void {
      this.$mdSidenav('left').open();
    }
    
    route(path: string) : void {
      this.$mdSidenav('left').close();
      this.$state.go(path);
    }
  }

  angular
    .module('app.layout')
    .controller("HeaderController", HeaderController)
}