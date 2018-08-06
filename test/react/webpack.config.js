const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'tests.react.src.js'),
  output: {
    path: __dirname,
    filename: 'tests.react.build.js',
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    'ReactTestUtils': 'window.ReactTestUtils',
    'prop-types': 'window.PropTypes',
    highlightjs: 'window.hljs',
    'text-different': 'window.textDifferent',
    TextDifferentForReact: 'window.TextDifferentForReact',
  },
  module: {
    rules: [
      {
        test: /^.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      },
    ]
  }
};

// ../../node_modules/.bin/webpack --config ./webpack.config.js --watch