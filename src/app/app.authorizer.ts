// authentication logic goes here
namespace app {
  'use strict';
  angular.module('app')
		.factory("Authorizer", Authorizer);

	function Authorizer() {		
		var authorize = function() {	
			return true;
		}
		
		var service = {
			authorize: authorize
		};
		
		return service;		
	}
}