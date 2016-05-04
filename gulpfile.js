var gulp = require('gulp');

var gulpif = require('gulp-if');

//var browserify = require('browserify');
var browserify = require('gulp-browserify');
//var babelify = require('babelify');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
//var uglify = require('gulp-uglify');
//var minifyCss = require('gulp-minify-css');
var dist = './dist';


gulp.task('default', [ 'js', 'useref', 'img', 'css', 'serve', 'watch']);



gulp.task('js', function() {
  gulp.src('src/js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('img', function() {
  gulp.src('src/img/*')
    .pipe(gulp.dest('./dist/img/'))
});

gulp.task('css', function() {
  gulp.src('src/css/*')
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('useref', function () {
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/*', ['js']);
  gulp.watch('./src/*.html', ['useref']);
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('./src/css/*', ['css']);
});

gulp.task('serve', function(){
  return browserSync.init({
    server: {
        baseDir: dist
    },
    files: [dist + '/css/*', dist + '/js/*', dist + '/img/*', dist + '/*.html']
  });
});
