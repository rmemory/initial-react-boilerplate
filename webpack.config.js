const path = require('path');

/* HtmlWebPagePlugin create the index.html file */
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	// Primary entry point for react application
	entry: ['babel-polyfill', './src/index.js'],

	// Output of build from webpack
	output: {
		// Put output into the dist folder
		path: path.join(__dirname, '/dist'),

		// output will be in a file name index_bundle.js
		filename: 'index_bundle.js'
	},

	devServer: {
		// Display only errors to reduce the amount of output.
		stats: "errors-only",
	
		// Parse host and port from env to allow customization.
		//
		// If you use Docker, Vagrant or Cloud9, set
		// host: options.host || "0.0.0.0";
		//
		// 0.0.0.0 is available to all network devices
		// unlike default `localhost`.
		// you can configure the server host and port options through environment 
		// parameters (example: PORT=3000 npm start)
		host: process.env.HOST, // Defaults to `localhost`
		port: process.env.PORT, // Defaults to 8080
		open: true, // Open the page in browser
		overlay: true, // Enable error overlay on the output
		historyApiFallback: true,
	},
	// Rules for loader. 
	module: {
		rules: [
			{
				// Do build the .jsx files
				test: /\.js|.jsx?$/,

				// Don't build the node_modules directory
				exclude: /node_modules/,

				// Use the babel-loader
				use: {
					loader: "babel-loader",
					options: {
						presets: ['react'],
					},
				}
			}
		]
	},
	// This creates the index.html, using the ./src/index.html as a 
	// starting template
	plugins: [
		new HtmlWebPackPlugin({
			// With no arg, it would attempt to create its own HTML file, 
			// but we specify a template instead
			template: './src/index.html'
		})
	]
}