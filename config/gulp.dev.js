const gulp = require('gulp');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const { rollup } = require('rollup');
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

function sassProject(){
  return gulp.src(dirname + '/src/**/*.sass')
    .pipe(changed(dirname + '/lib', {
      extension: '.css'
    }))
    .pipe(sass({
      outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(gulp.dest(dirname + '/lib'));
}

function copy(){
  return gulp.src(dirname + '/lib/**/*.css')
    .pipe(changed(dirname + '/build', {
      extension: '.css'
    }))
    .pipe(gulp.dest(dirname + '/build'));
}

async function build(){
  // 文件输入和输出路径
  const textDifferentEntry = dirname + '/lib/index.js';
  const textDifferentDist = dirname + '/build/text-different.js';

  const textDifferentForHtmlEntry = dirname + '/lib/dom/html.js';
  const textDifferentForHtmlDist = dirname + '/build/text-different-for-html.js';

  const textDifferentForReactEntry = dirname + '/lib/dom/react.js';
  const textDifferentForReactDist = dirname + '/build/text-different-for-react.js';

  // 输入
  const bundle = await Promise.all([
    rollup({ input: textDifferentEntry }),
    rollup({ input: textDifferentForHtmlEntry }),
    rollup({ input: textDifferentForReactEntry })
  ]);

  // 输出
  await Promise.all([
    bundle[0].write({
      format: 'umd',
      name: 'textDifferent',
      file: textDifferentDist
    }),
    bundle[1].write({
      format: 'umd',
      name: 'TextDifferentForHtml',
      file: textDifferentForHtmlDist,
      globals: {
        highlightjs: 'hljs',
        'text-different': 'textDifferent'
      }
    }),
    bundle[2].write({
      format: 'umd',
      name: 'TextDifferentForReact',
      file: textDifferentForReactDist,
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        highlightjs: 'hljs',
        'text-different': 'textDifferent'
      }
    })
  ]);
}

function watchJs(){
  gulp.watch(dirname + '/src/**/*.js', gulp.series(babelProject, build, reload));
}

function watchSass(){
  gulp.watch(dirname + '/src/**/*.sass', gulp.series(sassProject, copy, reload));
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
    gulp.parallel(babelProject, sassProject),
    gulp.parallel(build, copy),
    gulp.parallel(watchJs, watchSass, initBrowserSync)
  ));
};