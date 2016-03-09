var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
//var browserify = require('browserify');
var browserify = require('gulp-browserify');
//var babelify = require('babelify');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
//var uglify = require('gulp-uglify');
//var minifyCss = require('gulp-minify-css');
var dist = './dist';


gulp.task('default', ['sass', 'js', 'useref', 'serve', 'watch']);

gulp.task('sass', function() {
  gulp.src('src/sass/*')
    .pipe(sass())
    .pipe(gulp.dest('src/css/*'));
});

gulp.task('js', function() {
  gulp.src('src/js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('useref', function () {
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/*', ['sass']);
  gulp.watch('./src/js/*', ['js']);
  gulp.watch('./src/*.html', ['useref']);
  gulp.watch('./src/img/*', ['img']);
});

gulp.task('serve', function(){
  return browserSync.init({
    server: {
        baseDir: dist
    },
    files: [dist + '/css/*.css', dist + '/js/*', dist + '/img/*', dist + '/*.html']
  });
});
