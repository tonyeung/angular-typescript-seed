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

  var KarmaServer = require('karma').Server;
  var protractor = require("gulp-protractor").protractor;

  ///////////////////////////////////////////////////////
  // MAIN TASKS
  gulp.task('default', build);

  gulp.task('bs', browserSync);

  gulp.task('ut', unitTests);

  gulp.task('e2e', function(callback) {
    //runSequence();
  });

  ///////////////////////////////////////////////////////
  // COMPONENT TASKS
  gulp.task('clean', clean);
  gulp.task('build', build);
  gulp.task('process-code', processCode);
  gulp.task('process-styles', processStyles);
  gulp.task('move-fonts', moveFonts);
  gulp.task('move-static-content', moveStaticContent);
  gulp.task('write-unit-tests', writeUnitTests);
  gulp.task('unit-tests', unitTests);
  gulp.task('end2end', end2end);

  ///////////////////////////////////////////////////////
  // BUILD TASK IMPLEMENTATIONS
  function build (callback) {
      runSequence('clean',
                  ['process-code', 'process-styles', 'move-fonts', 'move-static-content'],
                  'write-unit-tests',
                  callback);
  }

  function clean() {
    return del(['dev/*','dist/*','tests/*']);
  }

  function processCode() {
    var javaScriptStream = gulp.src(config.jsFiles)
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jshint.reporter('fail'));

    var typeScriptStream = gulp.src(config.tsFiles)
                .pipe(tsc(tsc.createProject('tsconfig.json')))
                .pipe(ngAnnotate())
                .pipe(gulp.dest('tests/'));

    var templateCacheStream = gulp.src(['src/app/**/*.html','!src/app/index.html'])
                .pipe(templateCache())
                .pipe(ngAnnotate());

    return streamqueue({ objectMode: true }, javaScriptStream, typeScriptStream, templateCacheStream)
                // output to dev
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

  ///////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////
  function moveFonts() {
    return gulp.src(config.fontFiles)
                .pipe(plumber())
                .pipe(gulp.dest('dev/fonts/'))
                .pipe(gulp.dest('dist/fonts/'));
  }

  ///////////////////////////////////////////////////////
  function moveStaticContent() {
    return gulp.src(config.staticContent)
                .pipe(plumber())
                .pipe(gulp.dest('dev/'))
                .pipe(gulp.dest('dist/'));
  }

  ///////////////////////////////////////////////////////
  function browserSync(callback) {
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

    callback();

    function delayReloadDev(){
      if (reloadDevTO) {
        return;
      }

      reloadDevTO = setTimeout(function() {
        clearTimeout(reloadDevTO);
        reloadDevTO = undefined;
        reloadDev();
      }, 10000);

    }

    function delayReloadDist(){
      if (reloadDistTO) {
        return;
      }
      reloadDistTO = setTimeout(function() {
        clearTimeout(reloadDistTO);
        reloadDevTO = undefined;
        reloadDist();
      }, 10000);
    }
  }

  ///////////////////////////////////////////////////////
  // TEST TASK IMPLEMENTATIONS
  function writeUnitTests() {
    return gulp.src(config.unitTests)
                .pipe(tsc(tsc.createProject('tsconfig.json')))
                .pipe(gulp.dest('tests/unit-tests'));
  }

  function unitTests(callback) {
    new KarmaServer({
            configFile: __dirname + '/karma.conf.js',
            singleRun: false,
            autoWatch: true
        }, callback).start();
  }

  ///////////////////////////////////////////////////////
  function end2end() {
    return gulp.src(["e2e-tests/*.js"])
                .pipe(plumber())
                .pipe(protractor({
                  configFile: "protractor.config.js",
                  args: ['--baseUrl', 'http://localhost:8000']
                }));
                //.on('error', function(e) { throw e })
  }
})();