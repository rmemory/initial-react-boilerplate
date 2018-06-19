/* eslint-disable import/no-extraneous-dependencies */
const commonPaths = require('./common-paths');
const webpack = require('webpack');

const port = process.env.PORT || 3000;

const config = {
	/* See https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a */
	mode: 'development',

	entry: {
		app: ['babel-polyfill', `${commonPaths.appEntry}/index.js`],
	},

	output: {
		/* Usage of name means there will be a bundle per component, and each will be
		   hashed */
		filename: '[name].[hash].js',
	},

	devtool: 'inline-source-map', /* A SourceMap is added as a DataUrl to the
									 bundle. See the following:
									 http://blog.teamtreehouse.com/introduction-source-maps */

	/* Module: This describes what types of modules your application will
	   include, in our case we will support ESNext (Babel) and CSS Modules.

	   rules: How we handle each different type of module. Here is how rules
	   usually work:
	   {
		test: /\.YOUR_FILE_EXTENSION$/,
		exclude: /SOMETHING THAT IS THAT EXTENSION BUT SHOULD NOT BE PROCESSED/,
		use: {
		  loader: "loader for your file extension  or a group of loaders"
	   }
	 */
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true, // { style1, style2 } from ‘./styles.css’)
							camelCase: true, // .home-button {...} -> import { homeButton } from './styles.css'
							sourceMap: true,
						},
					},
				],
			},
		],
	},

	plugins: [
		/* Prints more readable module names in the browser terminal on HMR
		   updates */
		new webpack.NamedModulesPlugin(),

		// A fancy way to update modules while developing, and retaining state
		new webpack.HotModuleReplacementPlugin(),
	],

	// Configuration options for development server
	devServer: {
		host: 'localhost',
		port, // port: port,
		historyApiFallback: true,
		hot: true,
		open: true,
	},
};

module.exports = config;
