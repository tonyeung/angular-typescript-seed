// authentication logic goes here
namespace app {
  'use strict';
  angular.module('app')
		.factory("Authenticator", Authenticator);

	function Authenticator() {		
		var authenticate: app.auth.IAuthenticate = function() {			
			var user: app.auth.IAmAUser = {
				id: 0,
				claims: []
			};
			
			return user;
		}
		
		var service = {
			authenticate: authenticate
		};
		
		return service;		
	}
}