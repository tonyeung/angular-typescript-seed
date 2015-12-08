var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("dashboard", {
            url: "/",
            templateUrl: "home/dashboard.html",
            data: {
                pageTitle: "Dashboard"
            }
        });
    }
})(app || (app = {}));
