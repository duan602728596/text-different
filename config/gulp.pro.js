const gulp = require('gulp');
const babel = require('gulp-babel');
const { rollup } = require('rollup');
const { uglify } = require('rollup-plugin-uglify');

let dirname = null;

function babelProject(){
  return gulp.src(dirname + '/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dirname + '/lib'));
}

async function build(){
  // 文件输入和输出路径
  const textDifferentEntry = dirname + '/lib/index.js';
  const textDifferentDist = dirname + '/build/text-different.js';
  const textDifferentMinDist = dirname + '/build/text-different.min.js';

  const config = {
    format: 'umd',
    name: 'textDifferent'
  };

  // 输入
  const bundle = await Promise.all([
    rollup({ input: textDifferentEntry }),
    rollup({
      input: textDifferentEntry,
      plugins: [uglify()]
    })
  ]);

  // 输出
  await Promise.all([
    bundle[0].write({
      ...config,
      file: textDifferentDist
    }),
    bundle[1].write({
      ...config,
      file: textDifferentMinDist
    })
  ]);
}

module.exports = function(dir){
  dirname = dir;
  gulp.task('default',  gulp.series(babelProject, build));
};