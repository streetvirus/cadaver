const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  const task = config.tasks['styles'];

  let filePattern;

  if (task.filePattern) {
    filePattern = task.filePattern;
  } else {
    filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
  }
  
  watch(filePattern, gulp.parallel(task.watchTask));
});
