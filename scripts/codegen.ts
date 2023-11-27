// eslint-disable-next-line import/no-nodejs-modules
import path from "node:path";
import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as loadEnvironment } from "dotenv";

loadEnvironment();

// eslint-disable-next-line unicorn/prefer-module
const root = path.resolve(__filename, "../..");

const { GRAPHQL_API_KEY, GRAPHQL_SERVER_URI } = process.env;

if (!GRAPHQL_API_KEY || !GRAPHQL_SERVER_URI) {
	// eslint-disable-next-line functional/no-throw-statements
	throw new Error("Failed to load environment. Cannot import schema.");
}

// TODO: Redefine Maybe using option to disallow nullable fields
// TODO: Rename enums to PascalCase

const config: CodegenConfig = {
	documents: [ `${root}/src/**/*.graphql` ],
	generates: {
		[`${root}/src/app/graphql/generated/schema.ts`]: {
			config: {
				allowEnumStringTypes: true,
				avoidOptionals: true,
				defaultScalarType: "unknown",
				enumsAsTypes: true,
				immutableTypes: true,
				maybeValue: "T | undefined",
				namingConvention: "change-case-all#pascalCase",
				skipTypename: true,
				transformUnderscore: true,
				useTypeImports: true,
			},
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
			[ GRAPHQL_SERVER_URI ]: {
				headers: {
					apiKey: GRAPHQL_API_KEY,
				},
			},
		},
	],
};

export default config;
