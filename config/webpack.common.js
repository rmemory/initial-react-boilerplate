/* eslint-disable import/no-extraneous-dependencies */

/* webpack.common.js contains all webpack configuration info that is common to
   all configurations */

const commonPaths = require('./common-paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		// Split out the vendor module, as its a big boy
		vendor: ['semantic-ui-react'],
	},
	output: {
		path: commonPaths.outputPath,
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.js|.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},

	/* This optimization section is kind of magic. It makes sure the vendor
	   bundle size is as small as possible. See
	   https://github.com/webpack/webpack/issues/6357 */
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: 'vendor',
					name: 'vendor',
					enforce: true,
				},
			},
		},
	},

	plugins: [
		/* Generate index.html based on our template; with no arg, the plugin
		   would attempt to create its own HTML file, but this causes it to
		   use our template */
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			favicon: 'public/favicon.ico',
		}),
	],
};

module.exports = config;
