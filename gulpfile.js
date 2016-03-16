var gulp      = require('gulp');
var cssimport = require("gulp-cssimport");

var globalConfig = {
  src: '_scss'
};

// Process CSS
gulp.task('styles', function(){
  return gulp.src(globalConfig.src + '/main.scss.liquid')
    .pipe(cssimport({
      filter: !/\*.+?\*/ // Don't process imports that are commented out
    }))
    .pipe(gulp.dest('assets/'))
    .on('error', function(error){
      console.log(error);
      this.emit('end')
    });
})

// Watch files
gulp.task('watch', function () {
  gulp.watch(globalConfig.src + '/**/*.*', ['styles']);
});

// Default task
gulp.task('default', ['watch']);