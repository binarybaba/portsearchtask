module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/javascripts',
        publicPath: '/javascripts',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};
