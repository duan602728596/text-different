const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const rollup = require('rollup');
const browserSync = require('browser-sync').create();
const errorHandler = require('./errorHandler.js');

const reload = browserSync.reload;
let dirname = null;

function babelProject(){
  return gulp.src(dirname + '/src/**/*.js')
    .pipe(changed(dirname + '/lib', {
      extension: '.js'
    }))
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(babel())
    .pipe(gulp.dest(dirname + '/lib'));
}

function build(){
  // rollup
  const entry = dirname + '/lib/index.js';
  const dest = dirname + '/build/textDifferent.js';

  return rollup.rollup({
    input: entry
  }).then((bundle)=>{
    bundle.write({
      format: 'umd',
      name: 'textDifferent',
      file: dest
    });
  }).then(()=>{
    reload();
  });
}

function watch(){
  gulp.watch(dirname + '/src/**/*.js', gulp.series(babelProject, build));
}

function initBrowserSync(){
  browserSync.init({
    server: {
      baseDir: dirname,
      index: './example/index.html'
    },
    files: dirname,
    startPath: './example/index.html'
  });
}

module.exports = function(dir){
  dirname = dir;
  gulp.task('default', gulp.series(
    babelProject,
    build,
    gulp.parallel(watch, initBrowserSync)
  ));
};