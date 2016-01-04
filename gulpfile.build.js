(function() {
  // todo: need to refactor common code and look for a way to remove the need for the css/js configuration blocks, maybe by using wiredep
  // start up a browser sync instance in order to verify the site still looks good
  // fonts and static and browser sync content need to be factored out
  // replace minify with nano for css
  // also make e2e run on the dist build
  var gulp = require('gulp');
  var config = require('./gulpfile.config.js');

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
  
  ///////////////////////////////////////////////////////
  // TASK IMPLEMENTATIONS
  function build (callback) {
      runSequence('clean-dist',
                  ['process-code', 'process-styles', 'process-fonts', 'process-static-content'],
                  'write-dist-index',
                  callback);
  }

  ///////////////////////////////////////////////////////
  function cleanDist() {
    var del = require('del');
    return del(['dist/*']);
  }

  ///////////////////////////////////////////////////////
  function processCode() {
    var jshint = require('gulp-jshint');
    var tsc = require('gulp-typescript');
    var ngAnnotate = require('gulp-ng-annotate');
    var templateCache = require('gulp-angular-templatecache');
    var streamqueue = require('streamqueue');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');
    
    var javaScriptStream = gulp.src(config.jsFiles)
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jshint.reporter('fail'));

    var typeScriptStream = gulp.src(config.tsFiles)
                .pipe(tsc(tsc.createProject('tsconfig.json')))
                .pipe(ngAnnotate())

    var templateCacheStream = gulp.src(['src/app/**/*.html','!src/app/index.html'])
                .pipe(templateCache())
                .pipe(ngAnnotate());

    return streamqueue({ objectMode: true }, javaScriptStream, typeScriptStream, templateCacheStream)    
                .pipe(concat('app.js'))
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/js/'));
  }

  ///////////////////////////////////////////////////////
  function processStyles() {
    var less = require('gulp-less');
    var autoPrefixer = require('gulp-autoprefixer');
    var streamqueue = require('streamqueue');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    var minifyCss = require('gulp-minify-css');
    
    var cssStream =  gulp.src(config.cssFiles);
    var lessStream = gulp.src(config.lessFiles)
                .pipe(less())
                .pipe(autoPrefixer( { browsers: ['last 2 version', '> 5%'] }));

    return streamqueue({ objectMode: true }, cssStream, lessStream)
                .pipe(concat('app.css'))
                .pipe(sourcemaps.init())
                .pipe(minifyCss())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/css/'));
  }

  ///////////////////////////////////////////////////////
  function processFonts() {
    return gulp.src(config.fontFiles)
                .pipe(plumber())
                .pipe(gulp.dest('dist/fonts/'));
  }

  ///////////////////////////////////////////////////////
  function processStaticContent() {
    return gulp.src('src/assets/**/*')
                .pipe(plumber())
                .pipe(gulp.dest('dist/'));
  }
  
  ///////////////////////////////////////////////////////
  function writeDistIndex() {
    var inject = require('gulp-inject');
    return gulp.src('src/app/index.html')
                .pipe(inject(gulp.src('dist/js/app.js', { read: false }), { ignorePath: 'dist/' }))
                .pipe(inject(gulp.src('dist/css/app.css', { read: false }), { ignorePath: 'dist/' }))
                .pipe(gulp.dest('dist/'));
  }
})();