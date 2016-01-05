namespace app {
  export interface IControlHeader {
    openLeftMenu(): void;
  }

  class HeaderController implements IControlHeader {

    constructor(private $mdSidenav: ng.material.ISidenavService) { }

    openLeftMenu(): void {
      console.log('open menu');

      this.$mdSidenav('left').toggle();
    }
  }

  angular
    .module('app.layout')
    .controller("HeaderController", HeaderController);
}