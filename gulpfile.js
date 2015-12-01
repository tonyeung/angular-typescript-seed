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

  var sourcemaps = require('gulp-sourcemaps');
  var less = require('gulp-less');
  var minifyCss = require('gulp-minify-css');

  var templateCache = require('gulp-angular-templatecache');


  // MAIN TASKS
  gulp.task('default', function(callback) {
    runSequence('clean',
                ['process-code', 'process-styles', 'move-fonts', 'move-static-content'],
                'watch',
                'watch-tests',
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
  gulp.task('process-styles', processStyles);
  gulp.task('move-fonts', moveFonts);
  gulp.task('move-static-content', moveStaticContent);
  gulp.task('watch', watch);
  gulp.task('watch-tests', watchTests);


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

  function processStyles() {
    return gulp.src(config.cssFiles)
                .pipe(plumber())
                // construct app.css
                .pipe(sourcemaps.init())
                .pipe(addStream(gulp.src(config.lessFiles)))
                .pipe(less())
                .pipe(sourcemaps.write())
                .pipe(concat('app.css'))
                // output to dev
                .pipe(gulp.dest('dev/css/'))
                // minify and output to dist
                .pipe(minifyCss())
                .pipe(gulp.dest('dist/css/'));
  }

  function moveFonts() {
    return gulp.src(config.fontFiles)
                .pipe(plumber())
                .pipe(gulp.dest('dev/fonts/'))
                .pipe(gulp.dest('dist/fonts/'));
  }

  function moveStaticContent() {
    return gulp.src(config.staticContent)
                .pipe(plumber())
                .pipe(gulp.dest('dev/'))
                .pipe(gulp.dest('dist/'));
  }

  function watch() {
    return gulp.watch(['src/**/*', 'tests/**/*.ts'], ['default']);
  }

  function watchTests() {
    return gulp.watch(['tests/**/*.ts'], ['ut']);
  }
})();