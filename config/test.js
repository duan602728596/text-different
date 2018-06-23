const browserSync = require('browser-sync').create();

browserSync.init({
  server: {
    baseDir: './',
    index: './test/index.html'
  },
  files: './',
  startPath: './test/index.html'
});