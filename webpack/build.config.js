const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
	let config = {
		entry: path.join(__dirname, '../src'),
		output: {
			filename: 'index.js',
			path: path.join(__dirname, '../build'),
			chunkFilename: 'index.chunk.js',
			library: {
				name: 'reactHtmlWriter',
				type: 'umd',
				umdNamedDefine: true
			}
		},
		/* plugins: [
			new MiniCssExtractPlugin({
				filename: 'index.css'
			})
		], */
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
					'style-loader'/* MiniCssExtractPlugin.loader */,
					{
						loader: "css-loader",
						options: {
							modules: true,
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader'/* MiniCssExtractPlugin.loader */,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							modules: true,
						}
					}
				]
			}]
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						keep_fnames: true
					}
				})
			]
		},
		externals: {
			react: 'React'
		}
	}

	return config
}
