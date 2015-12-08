var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("inventory", {
            url: "/inventory",
            templateUrl: "inventory/inventory.html",
            data: {
                pageTitle: "Inventory"
            }
        });
    }
})(app || (app = {}));
