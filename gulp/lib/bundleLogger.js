/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/
// TODO: remove gulp-util

const gutil = require('gulp-util');
const prettyHrtime = require('pretty-hrtime');
let startTime;

module.exports = {
  start(filepath) {
    startTime = process.hrtime();
    gutil.log(gutil.colors.inverse('Bundling'), gutil.colors.green(filepath) + '...');
  },

  watch(bundleName) {
    gutil.log(gutil.colors.cyan('Watching files required by'), gutil.colors.yellow(bundleName));
  },
  minifyifying(bundleName) {
    gutil.log(gutil.colors.yellow('minifyifying-ing'), gutil.colors.yellow(bundleName));
  },

  end(filepath) {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    gutil.log(gutil.colors.bgMagenta('Bundled:'), gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};
