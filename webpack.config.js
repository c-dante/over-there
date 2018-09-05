'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './build',
	},

	plugins: [
		new CleanWebpackPlugin(['build']),
		new HtmlWebpackPlugin({
			title: 'over-there',
		}),
		new webpack.DefinePlugin({
			'CANVAS_RENDERER': JSON.stringify(true),
			'WEBGL_RENDERER': JSON.stringify(true)
		})
	],

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[contenthash].bundle.js'
	},

	module: {
		rules: [
			{
				test: [ /\.vert$/, /\.frag$/ ],
				use: 'raw-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			}
		]
	},
};
