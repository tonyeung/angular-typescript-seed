/*
 * NOTES
 * Web Server
 * This gulp file does not run a server
 * A simple http server is expected with the dev or dist folder as its root
 *
 * ngAnnotate
 * snippets/templates should be used for new angular functions
 *
 * Linting
 * Relying on VSCode's intellisense for pre transpile linting
 */

(function() {

  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');

  var runSequence = require('run-sequence');
  var del = require('del');
  var plumber = require('gulp-plumber');
  
  var ts = require('gulp-typescript');
  var addStream = require('add-stream').obj;
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');

  var templateCache = require('gulp-angular-templatecache');


  // MAIN TASKS
  gulp.task('default', function(callback) {
    runSequence('clean',
                ['process-code'],//, 'process-styles', 'move-fonts', 'move-static-resources'],
                //'watch',
                callback);
  });

  gulp.task('ut', function(callback) {
    //runSequence();
  });

  gulp.task('e2e', function(callback) {
    //runSequence();
  });

  // COMPONENT TASKS
  gulp.task('clean', clean);
  gulp.task('process-code', processCode);
  gulp.task('watch', watch);


  // TASK IMPLEMENTATIONS
  function clean() {
    return del(['dev/*','dist/*']);
  }

  function processCode() {
    return gulp.src(config.jsFiles)
                .pipe(plumber())
                // construct app.js
                .pipe(concat('app.js'))
                .pipe(addStream(gulp.src(config.tsFiles)))
                .pipe(ts(ts.createProject('tsconfig.json')))
                .pipe(addStream(createTemplateCache()))
                .pipe(concat('app.js'))
                // output to dev
                .pipe(gulp.dest('dev/js/'))
                // obfuscate and output to dist
                .pipe(uglify())
                .pipe(gulp.dest('dist/js/'));
  }

  function createTemplateCache() {
    return gulp.src(['src/app/**/*.html','!src/app/common/templates/index.htnml'])
                .pipe(plumber())
                .pipe(templateCache());
  }

  function watch() {
    return gulp.watch(['src/**/*', 'tests/**/*.ts'], ['default']);
  }

  function watchTests() {
    return gulp.watch(['tests/**/*.ts'], ['ut']);
  }
})();