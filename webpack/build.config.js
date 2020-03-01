const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
    let config = {
        entry: {
            index: './src/index.js'
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, '../build'),
            chunkFilename: '[name].[chunkHash:7].chunk.js',
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: true,
                dry: false
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
            minimizer: [new TerserPlugin()]
        }
    }

    return config
}
