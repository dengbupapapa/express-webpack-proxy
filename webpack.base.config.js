var path, webpack, arg;

path = require('path');
webpack = require('webpack');
arg = require('./arguments.config.js');

module.exports = {
	cache: true,
	context: path.join(__dirname, 'view'),
	devtool: arg.env ? 'inline-source-map' : 'source-map', //cheap-source-map
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'javascript/[name].js' + (!arg.env ? '?[hash]' : ''),
		publicPath: '/',
		chunkFilename: path.join('javascript/chunk/[name].chunk.js') + (!arg.env ? '?[hash]' : '')
	},
	resolve: {
		alias: {
			// 'react-router-transition': path.join(__dirname, 'node_modules/react-router-transition/src/RouteTransition.jsx')
		},
		extensions: ['', '.js', '.json', '.scss', '.css'],
	},
	module: {
		//noParse: [],
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				plugins: []
			}
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url?limit=1000&name=images/[hash].[ext]'
		}, {
			test: /\.css$/,
			exclude: [/node_modules/, path.join(__dirname, './view/css/public')]
		}, {
			test: /\.less$/,
			exclude: [/node_modules/, path.join(__dirname, './view/css/public')]
		}, {
			test: /\.css$/,
			include: [/node_modules/, path.join(__dirname, './view/css/public')]
		}, {
			test: /\.less$/,
			include: [/node_modules/, path.join(__dirname, './view/css/public')]
		}, {
			test: /\.(eot|woff|ttf|svg)/,
			loader: 'file?name=elseFile/[hash]&prefix=font/'
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', path.join('javascript/public/[name].js') + (!arg.env ? '?[hash]' : '')),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
	]
};