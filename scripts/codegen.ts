import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// eslint-disable-next-line unicorn/prefer-module
const root = path.resolve(__filename, "../..");

const { graphqlApiKey, graphqlServerUri } = process.env;

if (graphqlApiKey === undefined || graphqlServerUri === undefined) {
	// eslint-disable-next-line functional/no-throw-statement
	throw new Error("Failed to load environment. Cannot import schema.");
}

const config: CodegenConfig = {
	documents: [ `${root}/src/**/*.graphql` ],
	generates: {
		[`${root}/src/app/graphql/generated/queries.ts`]: {
			plugins: [
				"typescript",
				"typescript-apollo-angular",
				"typescript-operations",
			],
		},
	},
	overwrite: true,
	schema: [
		{
			[graphqlServerUri]: {
				headers: {
					apiKey: graphqlApiKey,
				},
			},
		},
	],
};

export default config;
