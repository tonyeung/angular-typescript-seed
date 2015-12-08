var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("settings", {
            url: "/settings",
            templateUrl: "settings/settings.html",
            data: {
                pageTitle: "Settings"
            }
        });
    }
})(app || (app = {}));
