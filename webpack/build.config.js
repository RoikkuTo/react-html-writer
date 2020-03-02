const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
    let config = {
        entry: path.join(__dirname, '../src'),
        output: {
            filename: 'index.js',
            path: path.join(__dirname, '../build'),
            chunkFilename: 'index.chunk.js',
            library: 'reactHtmlWriter',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [{
                test: [/\.m?js$/, /\.jsx$/],
                exclude: /(node_modules|bower_components)/,
                resolve: {
                    extensions: ['.jsx', '.js'],
                },
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }]
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    keep_fnames: true
                }
            })]
        },
        externals: {
            react: 'react'
        }
    }

    return config
}
