import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { EnvironmentPlugin } from "webpack";
import { config as loadEnvironment } from "dotenv";

loadEnvironment();

const config = {
	module: {
		rules: [
			{
				loader: "json-loader",
				test: /\.json$/,
			},
		],
	},
	plugins: [
		new EnvironmentPlugin([
			"GRAPHQL_SERVER_URI",
			"GRAPHQL_API_KEY",
		]),
	],
	resolve: {
		plugins: [ new TsconfigPathsPlugin({ configFile: "tsconfig.json" }) ],
	},
};

export default config;
