module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        files: [
            { pattern: 'test-context.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'test-context.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['spec'],
        singleRun: false,
        plugins: [
            'karma-webpack' ,
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-spec-reporter'
        ],
    });
};
