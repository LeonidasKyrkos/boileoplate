const path = require('path');
const webpack = require('webpack');
const bourbon = require('node-bourbon').includePaths;

// paths
const SRC = './app/src';
const ENTRY = `${SRC}/js/main`;
const BUILD = './app/build';

// util
const BASE_CSS_LOADER = 'css?sourceMap';

// modules 
webpackConfig = {
	env: process.env.NODE_ENV || 'development',
	globals: {
		'process.env'  : {
			'NODE_ENV' : JSON.stringify(config.env)
		},
		'__DEV__'      : config.env === 'development',
		'__PROD__'     : config.env === 'production',
	},
	entry: [
		ENTRY,
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:3000'
	],
	output: {
		path: path.join(__dirname, BUILD),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	sassLoader: {
		includePaths: [bourbon]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'app/src/js')
			},
			{
				test    : /\.scss$/,
				loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = webpackConfig;