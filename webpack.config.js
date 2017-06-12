var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        chuncai: './src/app'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                text: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.jpg$|\.png/, loader: 'url?limit=81920&name=[name].[ext]' }
        ]
    },
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js', '.json', '.less'],
        alias: { // 设置别名

        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    externals: {
        'jquery': 'jQuery'
    }
};