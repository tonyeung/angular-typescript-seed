var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        angular.module('app.core', [
            'ngSanitize',
            'ui.router',
            'templates'
        ]);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
