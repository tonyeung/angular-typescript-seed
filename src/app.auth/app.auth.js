var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        angular.module('app.auth', [
            'LocalStorageModule'
        ]);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
