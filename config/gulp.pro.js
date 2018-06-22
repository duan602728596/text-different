const gulp = require('gulp');
const babel = require('gulp-babel');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify').uglify;

console.log(typeof  uglify.default);

let dirname = null;

function babelProject(){
  return gulp.src(dirname + '/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dirname + '/lib'));
}

function build(){
  // rollup
  const entry = dirname + '/lib/index.js';
  const dest = dirname + '/build/textDifferent.js';
  const destMin = dirname + '/build/textDifferent.min.js';
  const config = {
    format: 'umd',
    name: 'textDifferent'
  };

  return Promise.all([
    rollup.rollup({
      input: entry
    }),
    rollup.rollup({
      input: entry,
      plugins: [
        uglify()
      ]
    })
  ]).then((bundle)=>{
    bundle[0].write({
      ...config,
      file: dest
    });
    bundle[1].write({
      ...config,
      file: destMin
    });
  });
}

module.exports = function(dir){
  dirname = dir;
  gulp.task('default',  gulp.series(babelProject, build));
};