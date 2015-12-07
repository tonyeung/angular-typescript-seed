/*
 * NOTES
 *
 * source maps are generated for both dev and dist because
 * all the css/javascript files are concatenated
 * dev is left as is, dist is uglified
 * I am assuming automated deployments know to exclude *.map files
 *
 */

(function() {

  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');

  var runSequence = require('run-sequence');
  var del = require('del');
  var plumber = require('gulp-plumber');

  var streamqueue = require('streamqueue');
  var tsc = require('gulp-typescript');
  var ngAnnotate = require('gulp-ng-annotate');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');

  var sourcemaps = require('gulp-sourcemaps');
  var jshint = require('gulp-jshint');
  var less = require('gulp-less');
  var minifyCss = require('gulp-minify-css');

  var templateCache = require('gulp-angular-templatecache');
  var historyApiFallback = require('connect-history-api-fallback');
  var browserSyncDev = require('browser-sync').create('dev');
  var reloadDev = browserSyncDev.reload;
  var browserSyncDist = require('browser-sync').create('dist');
  var reloadDist = browserSyncDist.reload;


  // MAIN TASKS
  gulp.task('default', function(callback) {
    runSequence('build', ['watch', 'watch-tests'],'browser-sync', callback);
  });

  gulp.task('ut', function(callback) {
    //runSequence();
  });

  gulp.task('e2e', function(callback) {
    //runSequence();
  });

  // COMPONENT TASKS
  gulp.task('build', build);
  gulp.task('clean', clean);
  gulp.task('process-code', processCode);
  gulp.task('process-styles', processStyles);
  gulp.task('move-fonts', moveFonts);
  gulp.task('move-static-content', moveStaticContent);
  gulp.task('browser-sync', browserSync);
  gulp.task('watch', watch);
  gulp.task('watch-tests', watchTests);

  // TASK IMPLEMENTATIONS
  function build (callback) {
    runSequence('clean',
                ['process-code', 'process-styles', 'move-fonts', 'move-static-content'],
                callback);
  }

  function clean() {
    return del(['dev/*','dist/*']);
  }

  function processCode() {
    var javaScriptStream = gulp.src(config.jsFiles)
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jshint.reporter('fail'));

    var typeScriptStream = gulp.src(config.tsFiles)
                .pipe(tsc(tsc.createProject('tsconfig.json')));

    var templateCacheStream = gulp.src(['src/app/**/*.html','!src/app/index.html'])
                .pipe(templateCache());

    return streamqueue({ objectMode: true }, javaScriptStream, typeScriptStream, templateCacheStream)
                // output to dev
                .pipe(ngAnnotate())
                .pipe(sourcemaps.init())
                .pipe(concat('app.js'))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('dev/js/'))
                // minify and output to dist
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/js/'));
  }

  function processStyles() {
    var cssStream =  gulp.src(config.cssFiles);
    var lessStream = gulp.src(config.lessFiles)
                .pipe(sourcemaps.init())
                .pipe(less())
                .pipe(sourcemaps.write());

    return streamqueue({ objectMode: true }, cssStream, lessStream)
                // output to dev
                .pipe(sourcemaps.init())
                .pipe(concat('app.css'))
                .pipe(sourcemaps.write())
                // output to dev
                .pipe(gulp.dest('dev/css/'))
                // minify and output to dist
                .pipe(sourcemaps.init())
                .pipe(minifyCss())
                .pipe(sourcemaps.write('.'))
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

  function browserSync() {
    var reloadDevTO;
    var reloadDistTO;
    browserSyncDev.init({
      port: 8000,
      ui: false,
      server: {
        baseDir: "./dev",
        middleware: [historyApiFallback()]
      }
    });

    browserSyncDist.init({
      port: 9000,
      ui: false,
      server: {
        baseDir: "./dist",
        middleware: [historyApiFallback()]
      }
    });

    // reload the browser on compiled change
    gulp.watch('dev/*').on('change', delayReloadDev);
    gulp.watch('dist/*').on('change', delayReloadDist);

    function delayReloadDev(){
      if (reloadDevTO) {
        clearTimeout(reloadDevTO);
        reloadDevTO = undefined;
      }
      reloadDevTO = setTimeout(function() {
        reloadDev();
      }, 10000);
    }

    function delayReloadDist(){
      if (reloadDistTO) {
        clearTimeout(reloadDistTO);
        reloadDevTO = undefined;
      }
      reloadDistTO = setTimeout(function() {
        reloadDist();
      }, 10000);
    }
  }

  function watch() {
    return gulp.watch(['src/**/*', 'tests/**/*.ts'], ['build']);
  }

  function watchTests() {
    return gulp.watch(['tests/**/*.ts'], ['ut']);
  }
})();