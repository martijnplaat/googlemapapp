module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['browserify', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'scripts/general/config.constant.js',
            'scripts/find-location/filter/filter.controller.js',
            'scripts/find-location/map/map.controller.js',
            'scripts/find-location/map/map.factory.js',
            'scripts/find-location/map/map.directive.js',
            'scripts/find-location/search/findlocationapi.factory.js',
            'scripts/find-location/search/search.controller.js',
            'scripts/general/config.constant.js',
            'test/**/*.js'
        ],

        preprocessors: {
            'scripts/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },

        // list of files / patterns to exclude
        exclude: [
        ],

        // web server port
        port: 8848,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'Chrome'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

    });
};