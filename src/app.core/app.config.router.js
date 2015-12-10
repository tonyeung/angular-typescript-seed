var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        angular
            .module('app.core')
            .run(SetUiRouterOnRoot)
            .config(ConfigureRouting);
        function SetUiRouterOnRoot($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on("$stateChangeError", console.log.bind(console));
        }
        function ConfigureRouting($locationProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");
        }
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
