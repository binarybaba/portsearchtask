const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry:  './src/App/Index.jsx',
    devtool: 'cheap-eval-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        publicPath: '/public/',
        historyApiFallback: true,
        overlay: true,
        proxy: {
            "/api" : {
                target: 'http://localhost:3000'
            }
        }
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }, {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /.svg$/,
            loader: 'svg-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: "css-loader",
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css"
        })
    ]
};
