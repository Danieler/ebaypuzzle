module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        client: {
            karmaHTML: {
                source: [
                     {src: './client/game.html', tag: 'game'}
                ],
                auto: true
            }
        },
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
        reporters: ['spec','karmaHTML'],
        singleRun: true,
        plugins: [
            'karma-webpack' ,
            'karma-jasmine',
            'karma-html',
            'karma-chrome-launcher',
            'karma-spec-reporter'
        ],
    });
};
