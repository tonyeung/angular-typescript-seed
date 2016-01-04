(function() {

  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');
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
  gulp.task('wait-for-last-change', waitForLastChange);
  gulp.task('restart-e2e', ['wait-for-last-change'], startEnd2End);

  ///////////////////////////////////////////////////////
  // TASK IMPLEMENTATIONS
  
  function defaultTask(callback) {
      runSequence('compile', 
                'watch-src', 
                ['start-syncing-dev-site', 'start-automated-unit-tests'],
                ['start-e2e', 'watch-dev', 'watch-e2e'],
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


  ///////////////////////////////////////////////////////
  function clean() {
    var del = require('del');
    return del(['dev/*', 'unit-tests/*', '!unit-tests/mocha-test-runner.html']);
  }
  

  ///////////////////////////////////////////////////////
  function runTsc() {
    var tsc = require('gulp-typescript');
    var ngAnnotate = require('gulp-ng-annotate');
    
    return gulp.src(config.tsFiles)
                .pipe(plumber())
                .pipe(tsc(tsc.createProject('tsconfig.json')))
                .pipe(ngAnnotate())
                .pipe(gulp.dest('dev/'))
                .pipe(gulp.dest('unit-tests/'));
  }
  

  ///////////////////////////////////////////////////////
  function transpileLess() {
    var sourcemaps = require('gulp-sourcemaps');
    var less = require('gulp-less');
    var autoPrefixer = require('gulp-autoprefixer');
    
    return gulp.src(config.lessFiles)
                .pipe(less())
                .pipe(autoPrefixer( { browsers: ['last 2 version', '> 5%'] }))
                .pipe(sourcemaps.init())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('dev/css/'));
  }
  

  ///////////////////////////////////////////////////////
  function moveFonts() {
    return gulp.src(config.fontFiles)
                .pipe(plumber())
                .pipe(gulp.dest('dev/fonts/'))
  }
  

  ///////////////////////////////////////////////////////
  function moveStaticContent() {
    return gulp.src('src/assets/**/*')
                .pipe(plumber())
                .pipe(gulp.dest('dev/'));
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
    var browserSync = require('browser-sync').create('dev');
    
    browserSync.init({
      port: 8000,
      ui: false,
      server: {
        baseDir: './dev',
        routes: {
          '/bower_components': './bower_components'  
        },
        middleware: [historyApiFallback()]
      }
    }, callback);
  }
  

  ///////////////////////////////////////////////////////
  function startUnitTests() {
    var historyApiFallback = require('connect-history-api-fallback');
    var browserSync = require('browser-sync').create('ut');
    
    browserSync.init({
      port: 9000,
      ui: false,
      server: {
        baseDir: './unit-tests',
        routes: {
          '/bower_components': './bower_components',
          '/node_modules': './node_modules'  
        },
        middleware: [historyApiFallback()]
      },
      startPath: 'mocha-test-runner.html'
    });
  }
  

  ///////////////////////////////////////////////////////
  function startEnd2End(callback) {
    var protractor = require("gulp-protractor").protractor;
    
    gulp.src(["e2e-tests/*.js"])
                .pipe(plumber())
                .pipe(protractor({
                  configFile: "protractor.config.js",
                  args: ['--baseUrl', 'http://localhost:8000']
                }))
                .on('error', function(e) {
                  console.log('**************************************************');
                  console.log('');
                  console.log('did you remember to run `webdriver-manager start`?');
                  console.log('');
                  console.log('**************************************************');
                  //throw e;
                })
                .on('end', callback);
  }
})();