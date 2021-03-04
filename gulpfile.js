const requireDir = require('require-dir');

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });