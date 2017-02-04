var webpack = require('webpack');
var path = require('path')

module.exports = {
    entry: [
        './scripts/index.tsx'
    ],
    resolve: {
        root: [
            path.resolve(__dirname, 'scripts'),
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, 'img'),
            path.resolve(__dirname, 'fonts'),
            path.resolve(__dirname, 'node_modules'),
        ]
    },

    output: {
        pathinfo: true,
        path: path.resolve('dist'),
        filename: "index.js",
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "babel",
                include: path.resolve(__dirname, 'scripts'),
                exclude: /node_modules/,
                query: {
                    presets:  [
                        "es2015",
                        "react",
                        "stage-0",
                        "react-hmre"
                    ],
                    plugins: ['transform-react-jsx-img-import']
                },
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css!sass"]
            },
            {
                test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                include: path.resolve(__dirname, 'fonts'),
                loader: 'file-loader?name=/[path][name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                include: path.resolve(__dirname, 'img'),
                loaders: [
                    'file-loader?name=/[path][name].[sha512:hash:base64:7].[ext]',
                    'image-webpack-loader' //?progressive=true&optimizationLevel=7&interlaced=true
                ]
            },
             {
                test: /\.(html)$/i,
                include: path.resolve(__dirname),
                loaders: [
                     'file-loader?name=[name].[ext]'                
                ]
            }
        ]
    },

    plugins: [],

    devServer: {
        path: path.resolve(__dirname, "dist"),
        historyApiFallback: {
            index: '/index.html'
        }
    },

    stats: {
        colors: true,
    },
}