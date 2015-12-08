var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("claims", {
            url: "/claims",
            templateUrl: "claims/claims.html",
            data: {
                pageTitle: "Claims"
            }
        });
    }
})(app || (app = {}));
