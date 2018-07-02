const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const { rollup } = require('rollup');
const { uglify } = require('rollup-plugin-uglify');

let dirname = null;

function babelProject(){
  return gulp.src(dirname + '/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dirname + '/lib'));
}

function sassProject(){
  return gulp.src(dirname + '/src/**/*.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(dirname + '/lib'));
}

function copy(){
  return gulp.src(dirname + '/lib/**/*.css')
    .pipe(gulp.dest(dirname + '/build'));
}

async function build(){
  // 文件输入和输出路径
  const textDifferentEntry = dirname + '/lib/index.js';
  const textDifferentDist = dirname + '/build/text-different.js';
  const textDifferentMinDist = dirname + '/build/text-different.min.js';

  const textDifferentForHtmlEntry = dirname + '/lib/dom/html.js';
  const textDifferentForHtmlDist = dirname + '/build/text-different-for-html.js';
  const textDifferentForHtmlMinDist = dirname + '/build/text-different-for-html.min.js';

  const textDifferentForReactEntry = dirname + '/lib/dom/react.js';
  const textDifferentForReactDist = dirname + '/build/text-different-for-react.js';
  const textDifferentForReactMinDist = dirname + '/build/text-different-for-react.min.js';

  const  textDifferentConfig = {
    format: 'umd',
    name: 'textDifferent'
  };

  const textDifferentForHtmlConfig = {
    format: 'umd',
    name: 'TextDifferentForHtml',
    globals: {
      highlightjs: 'hljs',
      'text-different': 'textDifferent'
    }
  };

  const textDifferentForReactConfig = {
    format: 'umd',
    name: 'TextDifferentForReact',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
      highlightjs: 'hljs',
      'text-different': 'textDifferent'
    }
  };

  // 输入
  const bundle = await Promise.all([
    rollup({ input: textDifferentEntry }),
    rollup({ input: textDifferentEntry, plugins: [uglify()] }),
    rollup({ input: textDifferentForHtmlEntry }),
    rollup({ input: textDifferentForHtmlEntry, plugins: [uglify()] }),
    rollup({ input: textDifferentForReactEntry }),
    rollup({ input: textDifferentForReactEntry, plugins: [uglify()] })
  ]);

  // 输出
  await Promise.all([
    bundle[0].write({
      ...textDifferentConfig,
      file: textDifferentDist
    }),
    bundle[1].write({
      ...textDifferentConfig,
      file: textDifferentMinDist
    }),
    bundle[2].write({
      ...textDifferentForHtmlConfig,
      file: textDifferentForHtmlDist
    }),
    bundle[3].write({
      ...textDifferentForHtmlConfig,
      file: textDifferentForHtmlMinDist
    }),
    bundle[4].write({
      ...textDifferentForReactConfig,
      file: textDifferentForReactDist
    }),
    bundle[5].write({
      ...textDifferentForReactConfig,
      file: textDifferentForReactMinDist
    })
  ]);
}

module.exports = function(dir){
  dirname = dir;
  gulp.task('default', gulp.series(
    gulp.parallel(babelProject, sassProject),
    gulp.parallel(build, copy)
  ));
};