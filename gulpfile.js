var gulp      = require('gulp');
var jshint    = require('gulp-jshint');
var uglify    = require('gulp-uglify');
var cssimport = require('gulp-cssimport');
var changed   = require('gulp-changed');

var paths = {
  scss: '_scss',
  js:   '_js'
};

var blobs = {
  scss: '_scss/**/*.*',
  js: '_js/**/*.js'
}

// Process JS
gulp.task('scripts', function(){

  return gulp.src(blobs.js)
    .pipe(changed('assets/'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/'));

});

// Process SCSS
gulp.task('styles', function(){

  return gulp.src(paths.scss + '/main.scss.liquid')
    .pipe(cssimport())
    .pipe(gulp.dest('assets/'))
    .on('error', function(error){
      console.log(error);
      this.emit('end')
    });
})

// Watch files
gulp.task('watch', function () {
  gulp.watch(blobs.scss, ['styles']);
  gulp.watch(blobs.js,   ['scripts']);
});

// Default task
gulp.task('default', ['watch']);