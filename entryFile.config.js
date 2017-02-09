var path, glob;

path = require("path");
glob = require('glob');

var files, srcDir, pattern, urls;

files = new Array();
srcDir = path.resolve(process.cwd(), 'view');
pattern = srcDir + '/css/public/**';
urls = glob.sync(pattern, {
	nodir: true
})

urls.forEach(function(item) {

	var matchs = item.match(/css.+\.css$/);

	files.push('./' + matchs)

});

var HtmlWebpackPlugin, arg, javascriptFiles, plugins;

HtmlWebpackPlugin = require('html-webpack-plugin');
arg = require('./arguments.config.js');
javascriptFiles = new Object();
plugins = new Array();

javascriptFiles['vendors'] = [
	'babel-polyfill'
].concat(files);

javascriptFiles['index'] = ['./javascript/index.js'];

if (arg.env) {

	javascriptFiles['index'].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

}

plugins.push(new HtmlWebpackPlugin({ //html出入口
	filename: './WEB-INF/index.html',
	template: './WEB-INF/index.html',
	inject: 'body',
	minify: {
		removeComments: !arg.env,
		collapseWhitespace: !arg.env,
		minifyJS: !arg.env,
		minifyCSS: !arg.env
	},
	cache: !arg.env
}))

module.exports = {
	javascriptFiles: javascriptFiles,
	plugins: plugins
};