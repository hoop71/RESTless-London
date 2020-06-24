const path = require('path')

module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: [path.resolve('./')],
				// alias: aliases,
			},
		],
	],
}
