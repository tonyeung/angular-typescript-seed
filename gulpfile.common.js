'use strict';

module.exports = {
  
  moveFonts: function (gulp, files, plumber, dest) {
    return gulp.src(files)
                .pipe(plumber())
                .pipe(gulp.dest(dest))
  }, 
  moveStaticContent: function(gulp, files, plumber, dest) {
    return gulp.src(files)
                .pipe(plumber())
                .pipe(gulp.dest(dest));
  },
  lessToCssStream: function(gulp, files, plumber, less, autoPrefixer, browsers) {
      return gulp.src(files)
                .pipe(plumber())
                .pipe(less())
                .pipe(autoPrefixer( { browsers: ['last 2 version', '> 5%'] }));
  },
  runTsc: function(gulp, tsFiles, plumber, tsc, ngAnnotate) {
      return gulp.src(tsFiles)
                .pipe(plumber())
                .pipe(tsc(tsc.createProject('tsconfig.json')))
                .pipe(ngAnnotate());
  },
  startBrowserSync: function(instanceName, port, baseDir, callback, startPath) {
    var historyApiFallback = require('connect-history-api-fallback');
    var browserSync = require('browser-sync').create(instanceName);
    var initOptions = {
      port: port,
      ui: false,
      server: {
        baseDir: baseDir,
        routes: {
          '/bower_components': './bower_components',
          '/node_modules': './node_modules'  
        },
        middleware: [historyApiFallback()]
      },
      reloadDelay: 1000
    }
    
    if (startPath) {
        initOptions.startPath = startPath;
    }
    browserSync.init(initOptions, callback);
  },
  startE2e: function(gulp, plumber, baseUrl, callback) {
    var protractor = require("gulp-protractor").protractor;
    console.log(baseUrl);
    gulp.src(["e2e-tests/*.js"])
                .pipe(plumber())
                .pipe(protractor({
                  configFile: "protractor.config.js",
                  args: ['--baseUrl', baseUrl]
                }))
                .on('error', function(e) {
                  console.log('**************************************************');
                  console.log('');
                  console.log('did you remember to run `webdriver-manager start`?');
                  console.log('');
                  console.log('**************************************************');
                  //throw e;
                  callback();
                })
                .on('end', callback);
  }
}