const process = require('process');
const devInit = require('./config/gulp.dev');
const proInit = require('./config/gulp.pro');

// 环境变量
const env = process.env.NODE_ENV;

switch(env){
  case 'development':
    devInit(__dirname);
    break;
  case 'production':
    proInit(__dirname);
    break;
  default:
    throw new Error('NODE_ENV is error.');
}