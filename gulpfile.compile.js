(function() {

  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');
  var common = require('./gulpfile.common.js');
  var runSequence = require('run-sequence');
  var plumber = require('gulp-plumber');
  var wireDep = require('wiredep').stream;
  var inject = require('gulp-inject');

  var wait;
  var lastEvent;

  ///////////////////////////////////////////////////////
  // MAIN TASK
  // default task includes watches and tests
  gulp.task('default', defaultTask);
  
  // compile task is for one off builds (run once)
  gulp.task('compile', compile);

  ///////////////////////////////////////////////////////
  // COMPONENT TASKS
  gulp.task('watch-src', watchSrc);
  gulp.task('watch-dev', watchDev);
  gulp.task('watch-e2e', watchE2e);
  gulp.task('clean', clean);
  gulp.task('run-tsc', runTsc);
  gulp.task('transpile-less', transpileLess);
  gulp.task('move-fonts', moveFonts);
  gulp.task('move-static-content', moveStaticContent);
  gulp.task('create-template-cache', createTemplateCache);
  gulp.task('copy-tests', copyTests);
  gulp.task('write-dev-html', writeDevIndex);
  gulp.task('write-unit-tests', writeUnitTestsIndex);
  gulp.task('start-syncing-dev-site', startSyncingDev);
  gulp.task('start-automated-unit-tests', startUnitTests);
  gulp.task('start-e2e', startEnd2End);
  gulp.task('start-e2e-results-server', startE2eResultsServer)
  gulp.task('wait-for-last-change', waitForLastChange);
  gulp.task('restart-e2e', ['wait-for-last-change'], startEnd2End);
  gulp.task('watch-e2e-results', ['start-e2e'], watchE2eResults);

  ///////////////////////////////////////////////////////
  // TASK IMPLEMENTATIONS
  
  function defaultTask(callback) {
      runSequence('compile', 
                'watch-src', 
                ['start-syncing-dev-site', 'start-automated-unit-tests'],
                ['start-e2e', 'watch-dev', 'watch-e2e', 'watch-e2e-results'],
                'start-e2e-results-server',
                callback);
  }
  

  ///////////////////////////////////////////////////////
  function compile(callback) {  
    runSequence('clean',
                ['run-tsc', 'transpile-less', 'move-fonts', 'move-static-content', 'create-template-cache', 'copy-tests'],
                ['write-dev-html','write-unit-tests'],
                callback);
  }
  

  ///////////////////////////////////////////////////////
  function watchSrc() {
    return gulp.watch('src/**/*',  ['compile'])
                .on('change', function(event) {
                    console.log(event);
                });
  }
  

  ///////////////////////////////////////////////////////
  function watchDev() {
    return gulp.watch('dev/*', ['restart-e2e']); //depends on wait
  }
  

  ///////////////////////////////////////////////////////
  function watchE2e() {
      return gulp.watch('e2e-tests/*', ['start-e2e']);
  }
  
  function watchE2eResults() {
      return gulp.watch('mochawesome-reports/*', function(){
        var browserSync = require('browser-sync');
        var e2e = browserSync.get('e2e');
        e2e.reload();        
      });
  }


  ///////////////////////////////////////////////////////
  function clean() {
    var del = require('del');
    return del(['dev/*', 'unit-tests/*', '!unit-tests/mocha-test-runner.html']);
  }
  

  ///////////////////////////////////////////////////////
  function runTsc() {
    var tsc = require('gulp-typescript');
    var ngAnnotate = require('gulp-ng-annotate');
    
    return common.runTsc(gulp, config.tsFiles, plumber, tsc, ngAnnotate)
                .pipe(gulp.dest('dev/'))
                .pipe(gulp.dest('unit-tests/'));
  }
  

  ///////////////////////////////////////////////////////
  function transpileLess() {
    var sourcemaps = require('gulp-sourcemaps');
    var less = require('gulp-less');
    var autoPrefixer = require('gulp-autoprefixer');
    
    return common.lessToCssStream(gulp, config.lessFiles, plumber, less, autoPrefixer)
                .pipe(sourcemaps.init())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('dev/css/'));
  }
  

  ///////////////////////////////////////////////////////
  function moveFonts() {
    return common.moveFonts(gulp, config.fontFiles, plumber, 'dev/fonts/');
  }
  

  ///////////////////////////////////////////////////////
  function moveStaticContent() {
    return common.moveStaticContent(gulp, 'src/assets/**/*', plumber, 'dev/');
  }
  

  ///////////////////////////////////////////////////////
  function createTemplateCache() {
    var templateCache = require('gulp-angular-templatecache');
                
    return gulp.src(['src/app/**/*.html','!src/app/index.html'])
                .pipe(templateCache())
                .pipe(gulp.dest('dev/app.core/'))
                .pipe(gulp.dest('unit-tests/app.core/'));
  }
  

  ///////////////////////////////////////////////////////
  function copyTests() {
    gulp.src('src/**/*.tests.js')
                .pipe(plumber())
                .pipe(gulp.dest('unit-tests/'));
  }
  

  ///////////////////////////////////////////////////////
  function writeDevIndex() {
    return gulp.src('src/app/index.html')
                .pipe(wireDep(config.getWireDepOptions))
                .pipe(inject(gulp.src('dev/**/*.js', { read: false }), { ignorePath: 'dev/' }))
                .pipe(inject(gulp.src('dev/css/**/*.css', { read: false }), { ignorePath: 'dev/' }))
                .pipe(gulp.dest('dev/'));
  }


  ///////////////////////////////////////////////////////
  function writeUnitTestsIndex(callback) {
    var options = config.getWireDepOptions();
    options.devDependencies = true;
    return gulp.src('src/app/mocha-test-runner.html')
                .pipe(wireDep(options))
                .pipe(inject(gulp.src(config.mochaTestingLibs, { read: false }), { starttag: '<!-- inject:mochaTestingLibs:{{ext}} -->' }))
                .pipe(inject(gulp.src('unit-tests/**/*.js', { read: false }), { ignorePath: 'unit-tests/' }))
                .pipe(gulp.dest('unit-tests/'));
  }
  

  ///////////////////////////////////////////////////////
  function startSyncingDev(callback) {
    var historyApiFallback = require('connect-history-api-fallback');
    common.startBrowserSync('dev', 8000, './dev', callback, [historyApiFallback(), routes]);
    
    function routes(req, res, next) {
      console.log(req.url);
      if(req.url == '/users') {
        res.end('[{ "id": 1, "email": "", "passwordHash": "", "claims": [] }]');
      }
      
      next();
    }
  }

  ///////////////////////////////////////////////////////
  function startUnitTests(callback) {
    var historyApiFallback = require('connect-history-api-fallback');
    common.startBrowserSync('ut', 9000, './unit-tests', callback, [historyApiFallback()], 'mocha-test-runner.html');
  }

  ///////////////////////////////////////////////////////
  function startEnd2End(callback) {
    common.startE2e(gulp, plumber, 'http://localhost:8000', callback);
  }
  
  function startE2eResultsServer(callback) {
    var historyApiFallback = require('connect-history-api-fallback');
    common.startBrowserSync('e2e', 8010, './mochawesome-reports', callback, [historyApiFallback()], 'mochawesome.html');
  }

  ///////////////////////////////////////////////////////
  function waitForLastChange(callback) {
    var moment = require('moment');
    var browserSync = require('browser-sync');
    var dev = browserSync.get('dev');
    var ut = browserSync.get('ut');
    
    if (!lastEvent) {
        lastEvent = moment.utc();
    }
    
    if (wait) {
        return;
    }
    else {
        wait = setInterval(function() {
            var now = moment.utc();
            if (now.diff(lastEvent, 'milliseconds') > 1500) {
                clearInterval(wait);
                wait = undefined;
                lastEvent = moment.utc();
                dev.reload();
                ut.reload();
                callback();
            }
            
        }, 100);
    }
  }
})();