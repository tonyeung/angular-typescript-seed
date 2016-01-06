namespace app {
	export interface IControlNav {
    current: string;
    closeLeftMenu(): void;
    route(path: string) : void; 
	}
	
	class NavController implements IControlNav {
    current: string;
		
		constructor(private $state: ng.ui.IStateService, private $mdSidenav: ng.material.ISidenavService) {
      this.current = $state.current.name;
    }
    
    closeLeftMenu(): void {
      this.$mdSidenav('left').close();
    }
    
    route(path: string) : void {
      this.$mdSidenav('left').close();
      this.$state.go(path);
    }
		
	}
	
	angular
		.module('app.layout')
		.controller("NavController", NavController);
}