const webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        files: [
            'src/**/*.spec.ts'
        ],
        preprocessors: {
            '**/*.ts': ['webpack']
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-webpack'
        ],
        webpack: {
            devtool: webpackConfig.devtool,
            mode: 'development',
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackMiddleware: {
            logLevel: 'error'
        }
    });
};
