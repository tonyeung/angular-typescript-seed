namespace app {
	export interface IControlNav {
    current: string;
    route(path: string) : void; 
	}
	
	class NavController implements IControlNav {
    current: string;
		
		constructor(private $state: ng.ui.IStateService, private $mdSidenav: ng.material.ISidenavService) {
      this.current = $state.current.name;
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