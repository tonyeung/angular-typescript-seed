(function() {
  // todo: 
  // replace minify with nano for css
  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');
  var common = require('./gulpfile.common.js');

  var runSequence = require('run-sequence');
  var plumber = require('gulp-plumber');

  ///////////////////////////////////////////////////////
  // MAIN TASK
  // call periodically to make sure styles still look right
  gulp.task('build', build);
  
  ///////////////////////////////////////////////////////
  // COMPONENT TASKS
  gulp.task('clean-dist', cleanDist)
  gulp.task('process-code', processCode);
  gulp.task('process-styles', processStyles);
  gulp.task('process-fonts', processFonts);
  gulp.task('process-static-content', processStaticContent);
  gulp.task('write-dist-index', writeDistIndex);
  gulp.task('start-dummy-dist-server', startDummyDistServer);
  gulp.task('start-e2e-dist', startE2eDist);
  
  ///////////////////////////////////////////////////////
  // TASK IMPLEMENTATIONS
  function build (callback) {
      runSequence('clean-dist',
                  ['process-code', 'process-styles', 'process-fonts', 'process-static-content'],
                  'write-dist-index',
                  'start-dummy-dist-server',
                  'start-e2e-dist',
                  callback);
  }

  ///////////////////////////////////////////////////////
  function cleanDist() {
    var del = require('del');
    return del(['dist/*']);
  }

  ///////////////////////////////////////////////////////
  function processCode() {
    var wireDep = require('wiredep');
    var jshint = require('gulp-jshint');
    var tsc = require('gulp-typescript');
    var ngAnnotate = require('gulp-ng-annotate');
    var templateCache = require('gulp-angular-templatecache');
    var streamqueue = require('streamqueue');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    
    var javaScriptStream = gulp.src(wireDep(config.getWireDepOptions()).js)
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jshint.reporter('fail'));

    var typeScriptStream = common.runTsc(gulp, config.tsFiles, plumber, tsc, ngAnnotate);

    var templateCacheStream = gulp.src(['src/app/**/*.html','!src/app/index.html'])
                .pipe(templateCache())
                .pipe(ngAnnotate());

    return streamqueue({ objectMode: true }, javaScriptStream, typeScriptStream, templateCacheStream)    
                .pipe(concat('app.js'))
                .pipe(sourcemaps.init())
                .pipe(uglify({ mangle: false }))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/js/'));
  }

  ///////////////////////////////////////////////////////
  function processStyles() {
    var wireDep = require('wiredep');
    var less = require('gulp-less');
    var autoPrefixer = require('gulp-autoprefixer');
    var streamqueue = require('streamqueue');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var minifyCss = require('gulp-minify-css');
    
    var cssStream =  gulp.src(wireDep(config.getWireDepOptions()).css);
    var lessStream = common.lessToCssStream(gulp, config.lessFiles, plumber, less, autoPrefixer)    

    return streamqueue({ objectMode: true }, cssStream, lessStream)
                .pipe(concat('app.css'))
                .pipe(sourcemaps.init())
                .pipe(minifyCss())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/css/'));
  }

  ///////////////////////////////////////////////////////
  function processFonts() {
    return common.moveFonts(gulp, config.fontFiles, plumber, 'dist/fonts/');
  }

  ///////////////////////////////////////////////////////
  function processStaticContent() {
    return common.moveStaticContent(gulp, 'src/assets/**/*', plumber, 'dist/');
  }
  
  ///////////////////////////////////////////////////////
  function writeDistIndex() {
    var inject = require('gulp-inject');
    return gulp.src('src/app/index.html')
                .pipe(inject(gulp.src('dist/js/app.js', { read: false }), { ignorePath: 'dist/' }))
                .pipe(inject(gulp.src('dist/css/app.css', { read: false }), { ignorePath: 'dist/' }))
                .pipe(gulp.dest('dist/'));
  }
  
  ///////////////////////////////////////////////////////
  function startDummyDistServer(callback) {
    var historyApiFallback = require('connect-history-api-fallback');
    common.startBrowserSync('dist', 8001, './dist', callback, [historyApiFallback()]);
  }
  
  ///////////////////////////////////////////////////////
  function startE2eDist(callback) {
    common.startE2e(gulp, plumber, 'http://localhost:8001', callback);
  }
})();