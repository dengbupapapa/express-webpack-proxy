var webpack, ExtractTextPlugin, webpackConfigBase, entryFile, arg;

webpack = require('webpack');
webpackConfigBase = require('./webpack.base.config');
entryFile = require('./entryFile.config');
arg = require('./arguments.config.js');

if (arg.env) {

	entryFile.plugins.push( //开发模式下热替换插件
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	);

	// webpackConfigBase.module.loaders[0].query.plugins = [ //开发模式下热替换module
	// 	[
	// 		'react-transform', {
	// 			transforms: [{
	// 				transform: 'react-transform-hmr',
	// 				imports: ['react'],
	// 				locals: ['module']
	// 			}]
	// 		}
	// 	]
	// ];
	webpackConfigBase.module.loaders[0].query['env'] = {
		// this plugin will be included only in development mode, e.g.
		// if NODE_ENV (or BABEL_ENV) environment variable is not set
		// or is equal to "development"
		"development": {
			"plugins": [
				// must be an array with options object as second item
				["react-transform", {
					// must be an array of objects
					"transforms": [{
							// can be an NPM module name or a local path
							"transform": "react-transform-hmr",
							// see transform docs for "imports" and "locals" dependencies
							"imports": ["react"],
							"locals": ["module"]
						}, {
							// you can have many transforms, not just one
							"transform": "react-transform-catch-errors",
							"imports": ["react", "redbox-react"]
						}]
						// by default we only look for `React.createClass` (and ES6 classes)
						// but you can tell the plugin to look for different component factories:
						// factoryMethods: ["React.createClass", "createClass"]
				}]
			]
		}
	}

	// webpackConfigBase.module.loaders[0].query.plugins.push([
	// 	'react-transform', {
	// 		transforms: [{
	// 			transform: 'react-transform-hmr',
	// 			imports: ['react'],
	// 			locals: ['module']
	// 		}]
	// 	}
	// ])

	webpackConfigBase.module.loaders[2].loader = 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]';
	webpackConfigBase.module.loaders[3].loader = 'style!css?modules&localIdentName=[name]__[local]-[hash:base64:5]!less';
	webpackConfigBase.module.loaders[4].loader = 'style!css';
	webpackConfigBase.module.loaders[5].loader = 'style!css!less';

} else {

	ExtractTextPlugin = require('extract-text-webpack-plugin');

	entryFile.plugins.push( //生产模式
		new ExtractTextPlugin('css/[name].css?[hash]', {
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);

	webpackConfigBase.module.loaders[2].loader = ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]');
	webpackConfigBase.module.loaders[3].loader = ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]', 'less-loader');
	webpackConfigBase.module.loaders[4].loader = ExtractTextPlugin.extract('style-loader', 'css-loader');
	webpackConfigBase.module.loaders[5].loader = ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader');

}

webpackConfigBase.entry = entryFile.javascriptFiles; //js入口文件
webpackConfigBase.plugins = webpackConfigBase.plugins.concat(entryFile.plugins); //插件集合

module.exports = webpackConfigBase;