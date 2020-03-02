const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
    let config = {
        entry: {
            index: './src/demo.js'
        },
        output: {
            filename: '[name].[hash:7].bundle.js',
            path: path.join(__dirname, 'build'),
            chunkFilename: '[name].[chunkHash:7].chunk.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.join(__dirname, 'build/index.html'),
                template: './public/index.html'
            })
        ],
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
                    argv.mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader"
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    argv.mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        devServer: {
            host: '0.0.0.0',
            port: 8001
        }
    }

    if (argv.mode === 'development') {
        config.devtool = 'eval-cheap-module-source-map'
    }

    if (argv.mode === 'production') {
        config.plugins.push(
            new CleanWebpackPlugin({
                verbose: true,
                dry: false
            })
        )
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[hash:7].bundle.css',
                chunkFilename: '[name].[hash:7].chunk.css'
            })
        )
        config.optimization.minimize = true
        config.optimization.minimizer = [new TerserPlugin()]
    }

    return config
}
