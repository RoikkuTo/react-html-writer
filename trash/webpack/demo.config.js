const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
	let config = {
		entry: {
			index: './src/demo/demo.js'
		},
		output: {
			filename: '[name].[hash:7].bundle.js',
			path: path.join(__dirname, 'build'),
			chunkFilename: '[name].[chunkHash:7].chunk.js',
		},
		devtool: 'eval-cheap-module-source-map',
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
				use: ["style-loader", {
					loader: "css-loader",
					options: {
						modules: true,
					}
				}],
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
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

	return config
}
