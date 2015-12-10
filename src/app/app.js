var app;
(function (app) {
    'use strict';
    angular.module('app', [
        'app.core',
        'app.auth',
        'LocalStorageModule'
    ]);
})(app || (app = {}));
