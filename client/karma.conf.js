// Karma configuration
// Generated on Wed Nov 17 2021 16:05:56 GMT-0800 (Pacific Standard Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon-chai', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: './config.js', included: true },
      { pattern: './src/**/*.json', included: false },
      { pattern: './src/**/*.html', included: false },
      { pattern: './src/**/*.js', included: false },
      { pattern: './src/**/*.jsx', included: false },
      { pattern: './library/**/*.js', included: false },
      { pattern: './unit-tests/**/*.js', included: false },
      { pattern: './unit-tests/main.js', included: true }
    ],

    // list of files / patterns to exclude
    exclude: [
      './src/private/header/failure.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      './src/**/*.js': ['browserify'],
      './src/**/*.jsx': ['browserify'],
      './unit-tests/**/*.js': ['browserify'],
      './src/**/*.js': ['coverage'],
    },

    coverageReporter: {
      type: 'text-summary',
      dir: 'coverage/',
      includeAllSources: true
    },

    reporters: ['progress', 'mocha', 'coverage'],

    browserify: {
      debug: true,
      transform: [
        'babelify',
        {
          presets: 'babel-preset-env'
        }
      ]
    },

    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity,
  })
}
