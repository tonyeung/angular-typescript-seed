namespace app {
	export interface IControlNav {
    current: string;
    route(path: string) : void; 
	}
	
	class NavController implements IControlNav {
    current: string;
		
		constructor(private $state: ng.ui.IStateService) {
      this.current = $state.current.name;
    }
    
    
    route(path: string) : void {
      this.$state.go(path);
    }
		
	}
	
	angular
		.module('app.layout')
		.controller("NavController", NavController);
}