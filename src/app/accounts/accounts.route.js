var app;
(function (app) {
    'use strict';
    angular
        .module('app')
        .config(ConfigureState);
    function ConfigureState($stateProvider) {
        $stateProvider
            .state("accounts", {
            url: "/accounts",
            templateUrl: "accounts/accounts.html",
            data: {
                pageTitle: "Accounts"
            }
        });
    }
})(app || (app = {}));
