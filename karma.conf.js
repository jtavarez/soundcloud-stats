var webpack = require('webpack');
var path = require('path')

module.exports = function (config) {
  config.set({
    // browsers: [ 'Chrome' ], //run in Chrome
    browsers: [ 'PhantomJS' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha','sinon' ], //use the mocha test framework
    files: [
      'tests.bundle.js' //just load this file
    ],
    preprocessors: {
      'tests.bundle.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'mocha' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname, './src'),
        alias: {
          'theme': path.resolve(__dirname, './src/styles/variables.styl')
        }
      },
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            include:/src/,
            loader: 'babel',
            query: {
              presets: ['airbnb']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
// var webpack = require('webpack');

// var webpackConfig = require('./webpack.config.js');
// webpackConfig.entry = {};

// var path = require('path')

// module.exports = function (config) {
//   config.set({
//     basePath: '',
//     browsers: [ 'PhantomJS' ],
//     singleRun: true, //just run once by default
//     frameworks: [ 'mocha' ], //use the mocha test framework
//     files: [
//       // 'tests/index.js' //just load this file
//       './src/**/*_test.js'
//     ],
//     // preprocessors: {
//     //   'tests/index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
//     // },
//     preprocessors: {
//       // 'tests/index.js': [ 'webpack', 'sourcemap' ], //preprocess with webpack and our sourcemap loader
//       './src/**/*_test.js': ['babel'],
//       './src/index.js': ['webpack', 'sourcemap']
//     },
//     reporters: [ 'dots' ], //report results in this format
//     // webpack: webpackConfig,
//     webpack: { //kind of a copy of your webpack config
//       devtool: 'inline-source-map', //just do inline source maps instead of the default
//       module: {
//         loaders: [
//           {
//             test: /\.js$/,
//             exclude: /\/node_modules\//,
//             loader: 'babel',
//             query: {
//               presets: ['react']
//             }
//           }
//         ]
//       },
//       resolve: {
//         extensions: ['', '.js', '.jsx'],
//         root: path.resolve(__dirname, 'src'),
//         fallback: [path.join(__dirname, './node_modules')]
//       },
//       externals: {
//         'cheerio': 'window',
//         'react/addons': true,
//         'react/lib/ExecutionEnvironment': true,
//         'react/lib/ReactContext': true
//       }
//     },
//     webpackServer: {
//       noInfo: true //please don't spam the console when running in karma!
//     }
//   });
// };

// // module.exports = function (config) {
// //   config.set({
// //     basePath: '',
// //     browsers: [ 'Chrome' ], //run in Chrome
// //     singleRun: true, //just run once by default
// //     frameworks: [ 'mocha' ], //use the mocha test framework
// //     files: [
// //       'tests/index.js' //just load this file
// //     ],
// //     preprocessors: {
// //       'tests/index.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
// //     },
// //     reporters: [ 'dots' ], //report results in this format
// //     webpack: { //kind of a copy of your webpack config
// //       devtool: 'inline-source-map', //just do inline source maps instead of the default
// //       module: {
// //         loaders: [
// //           { test: /\.js$/, loader: 'babel-loader' }
// //         ]
// //       }
// //     },
// //     webpackServer: {
// //       noInfo: true //please don't spam the console when running in karma!
// //     }
// //   });
// // };