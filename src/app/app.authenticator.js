// authentication logic goes here
var app;
(function (app) {
    'use strict';
    angular.module('app')
        .factory("Authenticator", Authenticator);
    function Authenticator() {
        var authenticate = function () {
            var user = {
                id: 0,
                claims: []
            };
            return user;
        };
        var service = {
            authenticate: authenticate
        };
        return service;
    }
})(app || (app = {}));
