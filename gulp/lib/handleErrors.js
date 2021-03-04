module.exports = (errorObject) => {
  const errSting = errorObject.toString().split(': ').join(':\n');

  // var sep = gutil.colors.black("\n\n"+'---------------------------------------'+"\n\n");

  // gutil.log(sep, errSting, sep);
  console.log(errorObject);

  // Keep gulp from hanging on this task
  // if (typeof this.emit === 'function') this.emit('end');
};
