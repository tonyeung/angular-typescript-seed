namespace app.layout {
  'use strict';
  
  class NavLeftDrawer implements ng.IDirective {
    templateUrl: string = 'layout/nav.directive.html';
    restrict: string = 'A';
    
    constructor(public $timeout: ng.ITimeoutService ) {}

    link = (scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, ngModel: ng.INgModelController) => {
      
      this.$timeout(() => {
          console.log(element.find('.nav-button-link'));
          element.find('.nav-button-link').click((e) => {
            console.log(e);
            element.find('.nav-sidebar').toggle(500);
          });
      });
    }
    
    static instance($timeout): ng.IDirective {
      var directive = new NavLeftDrawer($timeout); 
      return directive;
    }
  }

  angular
    .module('app.layout')
    .directive('navLeftDrawer', NavLeftDrawer.instance);
}