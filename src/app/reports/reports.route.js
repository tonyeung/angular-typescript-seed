var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("reports", {
            url: "/reports",
            templateUrl: "reports/reports.html",
            data: {
                pageTitle: "Reports"
            }
        });
    }
})(app || (app = {}));
