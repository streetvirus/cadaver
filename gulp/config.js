module.exports = {
  root: {
    src: './'
  },
  tasks: {
    styles: {
      src: './_styles',
      dest: './assets',
      filePattern: ['./_styles/**/*.scss'],
      files: ['theme.scss'],
      watchTask: 'styles',
      extensions: ['scss', 'css']
    },
    scripts: {
      src: './_scripts',
      dest: './assets',
      extensions: ['js'],
      bundles: [{
        entries: 'theme.js',
        outputName: 'theme.js'
      }]
    },
    eslint: {
      filePattern: ['./_scripts/**/*.js'],
      extensions: ['js']
    }
  }
};
