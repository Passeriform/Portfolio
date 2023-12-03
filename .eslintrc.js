module.exports = {
	"root": true,
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"overrides": [{
			"files": ["*.ts"],
			"parserOptions": {
				"ecmaVersion": 2020,
				"project": ["tsconfig.json", "tsconfig.app.json"],
				"sourceType": "module",
				"createDefaultProgram": true
			},
			"extends": [
				"plugin:@angular-eslint/all",
				"plugin:@typescript-eslint/all",
				"plugin:optimize-regex/all",
				"plugin:no-unsanitized/DOM",
				"plugin:import/recommended",
				"plugin:import/typescript",
				"plugin:typescript-sort-keys/recommended",
				"plugin:security/recommended",
				"plugin:functional/currying",
				"plugin:functional/external-typescript-recommended",
				"plugin:functional/external-vanilla-recommended",
				"plugin:functional/no-exceptions",
				"plugin:functional/no-other-paradigms",
				"plugin:functional/no-mutations",
				"plugin:functional/no-statements",
				"plugin:functional/recommended",
				"plugin:functional/stylistic",
				"plugin:jsdoc/recommended",
				"plugin:unicorn/recommended",
				"plugin:rxjs/recommended",
				"plugin:eslint-comments/recommended",
			],
			"plugins": [
				"@angular-eslint/eslint-plugin",
				"@typescript-eslint",
				"@typescript-eslint/tslint",
				"no-unsanitized",
				"optimize-regex",
				"import",
				"no-null",
				"prefer-arrow",
				"unicorn",
				"max-params-no-constructor",
				"rxjs",
				"typescript-sort-keys",
				"sort-destructure-keys",
				"immutable",
				"security",
				"functional",
				"jsdoc",
				"tsdoc",
				"deprecation",
			],
			"settings": {
				"import/parsers": {
					"@typescript-eslint/parser": [".ts"]
				},
				"import/resolver": {
					"typescript": {
						"alwaysTryTypes": true,
					},
					"node": {
						"extensions": ["ts"],
						"moduleDirectory": ["node_modules", "src/"]
					},
					"webpack": {
						"config": "./webpack.config.js"
					}
				}
			},
			"rules": {
				// Override @angular-eslint
				"@angular-eslint/component-selector": [
					"error",
					{
						"type": "element",
						"prefix": "app",
						"style": "kebab-case"
					}
				],
				"@angular-eslint/directive-selector": [
					"error",
					{
						"type": "attribute",
						"prefix": "app",
						"style": "camelCase"
					}
				],
				"@angular-eslint/no-empty-lifecycle-method": "off",
				"@angular-eslint/use-injectable-provided-in": "off",
				"@angular-eslint/prefer-on-push-component-change-detection": "off",

				// Override eslint-plugin-typescript-eslint
				"@typescript-eslint/ban-types": [
					"error",
					{
						"types": {
							"Object": {
								"message": "Avoid using the `Object` type. Did you mean `object`?",
								"fixWith": "Record<string, unknown>"
							},
							"Function": {
								"message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
							},
							"Boolean": {
								"message": "Avoid using the `Boolean` type. Did you mean `boolean`?",
								"fixWith": "boolean"
							},
							"Number": {
								"message": "Avoid using the `Number` type. Did you mean `number`?",
								"fixWith": "number"
							},
							"String": {
								"message": "Avoid using the `String` type. Did you mean `string`?",
								"fixWith": "string"
							},
							"Symbol": {
								"message": "Avoid using the `Symbol` type. Did you mean `symbol`?",
								"fixWith": "symbol"
							}
						}
					}
				],
				"@typescript-eslint/comma-dangle": ["error", "always-multiline"],
				"@typescript-eslint/class-methods-use-this": ["error", {
					"exceptMethods": [
						"ngOnInit",
						"ngAfterContentInit",
						"ngAfterViewInit",
						"ngOnDestroy",
						"onRouteChange",
						"transform",
						"resolve",
						"intercept"
					]
				}],
				"@typescript-eslint/explicit-member-accessibility": [
					"error",
					{
						"accessibility": "explicit",
						"ignoredMethodNames": [
							"ngOnInit",
							"ngOnChanges",
							"ngAfterContentInit",
							"ngAfterViewInit",
							"ngOnDestroy",
							"onRouteChange",
							"transform",
							"resolve",
							"intercept",
						],
						"overrides": {
							"constructors": "no-public",
						},
					}
				],
				"@typescript-eslint/explicit-module-boundary-types": ["error", {
					"allowedNames": [
						"ngOnInit",
						"ngOnChanges",
						"ngAfterContentInit",
						"ngAfterViewInit",
						"ngOnDestroy",
						"onRouteChange",
						"transform",
						"resolve",
						"intercept",
					]
				}],
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/max-params": "off",
				"@typescript-eslint/no-extra-parens": ["error", "all", {
					"nestedBinaryExpressions": false
				}],
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/consistent-type-definitions": ["error", "type"],
				"@typescript-eslint/consistent-type-imports": "error",
				"@typescript-eslint/no-unused-vars": ["error", {
					"ignoreRestSiblings": true,
					"varsIgnorePattern": "^_$",
					"argsIgnorePattern": "^_$"
				}],
				"@typescript-eslint/space-before-function-paren": ["error",
					{
						"anonymous": "always",
						"asyncArrow": "always",
						"named": "never"
					}
				],
				"@typescript-eslint/indent": ["error", "tab",
					{
						"SwitchCase": 1,
						"FunctionDeclaration": {
							"body": 1,
							"parameters": 2
						},
						"FunctionExpression": {
							"body": 1,
							"parameters": 2
						},
						"offsetTernaryExpressions": true,
						"ignoredNodes": ["TSTypeParameterInstantiation"]
					},
				],
				"@typescript-eslint/member-delimiter-style": [
					"error",
					{
						"multiline": {
							"delimiter": "semi",
							"requireLast": true
						},
						"singleline": {
							"delimiter": "comma",
							"requireLast": false
						}
					}
				],
				"@typescript-eslint/member-ordering": ["error",
					{
						"default": {
							"memberTypes": [
								// Fields
								"private-static-field",
								"protected-static-field",
								"public-static-field",

								"protected-abstract-field",
								"public-abstract-field",

								"private-instance-field",
								"protected-instance-field",
								"public-instance-field",

								"private-decorated-field",
								"protected-decorated-field",
								"public-decorated-field",

								"private-decorated-method",
								"protected-decorated-method",
								"public-decorated-method",

								"private-static-method",
								"protected-static-method",
								"public-static-method",

								"protected-abstract-method",
								"public-abstract-method",

								// Constructors
								"constructor",

								// Helper Methods
								"private-instance-method",
								"protected-instance-method",
								"public-instance-method",
							],
							"order": "natural-case-insensitive",
						}
					},
				],
				"@typescript-eslint/naming-convention": ["error",
					{
						"selector": "enumMember",
						"format": ["camelCase", "UPPER_CASE"]
					},
				],
				"@typescript-eslint/no-empty-function": ["error",
					{
						"allow": [
							"constructors",
							// Allow lifecycle methods as well somehow
						]
					}
				],
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-extraneous-class": ["error",
					{
						"allowWithDecorator": true
					}
				],
				// TODO: Allow magic numbers in all `*.config.ts` as config
				"@typescript-eslint/no-magic-numbers": ["error", {
					"ignore": [
						0,
						1,
						2,
						50,
						100
					]
				}],
				"@typescript-eslint/parameter-properties": ["error", {
						"allow": ["private readonly"],
				}],
				"@typescript-eslint/no-shadow": [
					"error",
					{
						"hoist": "all"
					}
				],
				"@typescript-eslint/no-type-alias": "off",
				"@typescript-eslint/object-curly-spacing": ["error", "always"],
				"@typescript-eslint/lines-between-class-members": ["error", "always", {
					"exceptAfterSingleLine": true
				}],
				"@typescript-eslint/prefer-readonly-parameter-types": "off",	// Too aggressive and lacking template checking
				"@typescript-eslint/prefer-enum-initializers": "off",
				"@typescript-eslint/promise-function-async": ["error", {
					allowAny: false,
				}],
				"@typescript-eslint/require-await": "error",
				"@typescript-eslint/triple-slash-reference": [
					"error",
					{
						"path": "always",
						"types": "prefer-import",
						"lib": "always"
					}
				],

				// @typescript-eslint/tslint or eslint-plugin-tslint
				"@typescript-eslint/tslint/config": ["error",
					{
						"rules": {
							"no-inferred-empty-object-type": true,
							"no-null-undefined-union": true,
							"no-promise-as-boolean": true,
							"no-restricted-globals": true,
							"number-literal-format": true,
							"prefer-method-signature": true,
							"prefer-while": true,
							"return-undefined": true,
							"static-this": true,
							"strict-type-predicates": true,
							"unnecessary-else": [
								true,
								{
									"allow-else-if": true
								}
							],
							"whitespace": [
								true,
								"check-branch",
								"check-decl",
								"check-operator",
								"check-separator",
								"check-rest-spread",
								"check-module",
								"check-type",
								"check-type-operator",
								"check-typecast",
								"check-preblock",
								"check-postbrace"
							]
						}
					}
				],

				// Override eslint-plugin-import
				"import/exports-last": "error",
				"import/first": "error",
				"import/group-exports": "off",
				"import/max-dependencies": "off",
				"import/newline-after-import": "error",
				"import/no-commonjs": "error",
				"import/no-cycle": "error",
				"import/no-default-export": "error",
				"import/no-duplicates": "error",
				"import/no-extraneous-dependencies": "error",
				"import/no-named-as-default-member": "error",
				"import/no-named-as-default": "error",
				"import/no-named-default": "error",
				"import/no-nodejs-modules": "error",
				"import/no-unassigned-import": ["error", {
					"allow": [
						"zone.js/**",
					]
				}],
				"import/no-unresolved": ["error", {
					"caseSensitive": true,
				}],
				"import/no-unused-modules": ["error", {
					"missingExports": true,
				}],
				"import/no-useless-path-segments": "error",
				"import/unambiguous": "error",
				"import/extensions": [
						"error",
						"ignorePackages",
						{
							"js": "never",
							"ts": "never",
						}
				 ],
				"import/order": ["error", {
					"groups": [
						"builtin",
						"external",
						"internal",
						["sibling", "parent"],
						"index",
						"object",
					],
					"pathGroups": [{
							"pattern": "@angular/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "rxjs/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@env/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@shared/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@app/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@core/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@graphql/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "@utility/**",
							"group": "internal",
							"position": "after",
						},
						{
							"pattern": "../**.module",
							"group": "parent",
							"position": "after",
						},
						{
							"pattern": "../**.component",
							"group": "parent",
							"position": "after",
						},
						{
							"pattern": "../**.service",
							"group": "parent",
							"position": "after",
						},
						{
							"pattern": "../**.pipe",
							"group": "parent",
							"position": "after",
						},
						{
							"pattern": "./**.module",
							"group": "sibling",
							"position": "after",
						},
						{
							"pattern": "./**.component",
							"group": "sibling",
							"position": "after",
						},
						{
							"pattern": "./**.service",
							"group": "sibling",
							"position": "after",
						},
						{
							"pattern": "./**.pipe",
							"group": "sibling",
							"position": "after",
						},
					]
				}],

				// eslint-plugin-no-null
				"no-null/no-null": "error",

				// eslint-plugin-prefer-arrow
				"prefer-arrow/prefer-arrow-functions": ["error",
					{
						"disallowPrototype": true,
						"singleReturnOnly": false,
						"classPropertiesAllowed": false
					},
				],

				// Override eslint-plugin-unicorn
				"unicorn/empty-brace-spaces": "off",
				"unicorn/explicit-length-check": "off",
				"unicorn/custom-error-definition": "error",
				"unicorn/import-index": "error",
				"unicorn/prevent-abbreviations": ["error",
				{
					"allowList": {
						"dev": true,
						"prod": true,
						"e2e": true,
					}
				}],
				"unicorn/prefer-at": "error",
				"unicorn/prefer-module": "error",
				"unicorn/prefer-object-has-own": "error",
				"unicorn/prefer-string-replace-all": "error",
				"unicorn/prefer-top-level-await": "error",
				"unicorn/no-array-reduce": "off",
				"unicorn/no-array-for-each": "off",
				"unicorn/no-array-callback-reference": "off",
				"unicorn/no-keyword-prefix": "error",
				"unicorn/no-nested-ternary": "error",
				"unicorn/no-unsafe-regex": "error",
				"unicorn/no-unused-properties": "error",
				"unicorn/string-content": ["error",
					{
						"patterns": {
							"'": {
								"suggest": "’",
								"message": "Please use `’` instead of `'` for message apostrophe.",
								"fix": false
							},
							"\\.\\.\\.": "…",
							"\-\>": "→",
							"\<\-": "→",
							"\=\>": "←",
							"\<\=": "⇐",
							"\<\=\>": "⇔",
							"^http:\\/\\/": "^https:\\/\\/"
						}
					}
				],

				// Override eslint-plugin-max-params-no-constructor
				"max-params-no-constructor/max-params-no-constructor": ["error", 6],

				// Override eslint-plugin-rxjs
				"rxjs/finnish": ["error", {
					"names": {
						"^(intercept)$": false,
						"^(resolve)$": false,
						"^(transform)$": false
					}
				}],
				"rxjs/no-exposed-subjects": "error",
				"rxjs/no-ignored-error": "off",
				"rxjs/no-ignored-observable": "error",
				"rxjs/no-ignored-subscribe": "off",
				"rxjs/no-ignored-subscription": "off",
				"rxjs/no-subject-value": "error",
				"rxjs/no-topromise": "error",
				"rxjs/no-unsafe-catch": "error",
				"rxjs/no-unsafe-first": "error",
				"rxjs/no-unsafe-switchmap": "error",
				"rxjs/no-unsafe-takeuntil": "error",
				"rxjs/prefer-observer": "error",
				"rxjs/suffix-subjects": "error",
				"rxjs/throw-error": "error",
				"rxjs/suffix-subjects": ["error", {
						"suffix": "Source",
					}
				],

				// Override eslint-plugin-typescript-sort-keys
				"typescript-sort-keys/string-enum": ["error", "asc", {
					"caseSensitive": true,
					"natural": true
				}],
				"typescript-sort-keys/interface": ["error", "asc", {
					"caseSensitive": true,
					"natural": true,
					"requiredFirst": true
				}],

				// eslint-plugin-sort-destructure-keys
				"sort-destructure-keys/sort-destructure-keys": "error",

				// eslint-plugin-immutable
				"immutable/no-this": "off",
				"immutable/no-mutation": "off",

				// eslint-plugin-functional
				"functional/no-classes": "off",
				"functional/no-this-expression": "off",
				"functional/prefer-type-literal": "off",
				"functional/prefer-readonly-type": "off",			// Too aggressive and lacking template checks
				"functional/prefer-immutable-types": ["error", {
					"enforcement": "ReadonlyShallow",
					"ignoreClasses": true,
					"ignoreInferredTypes": true,
				}],
				"functional/functional-parameters": ["error", {
					"allowRestParameter": true,
					"enforceParameterCount": false,
					"ignoreIdentifierPattern": [
						"ngOnInit",
						"ngAfterContentInit",
						"ngAfterViewInit",
						"ngOnDestroy",
						"onRouteChange",
						"transform",
						"resolve",
						"intercept",
					]
				}],
				"functional/no-expression-statements": "off",
				"functional/immutable-data": "off",
				"functional/no-return-void": "off",
				"functional/no-conditional-statements": "off",

				// eslint-plugin-tsdoc
				"tsdoc/syntax": "warn",

				// eslint-plugin-jsdoc
				// TODO: Recheck when documenting code
				"jsdoc/check-access": "error",
				"jsdoc/check-alignment": "error",
				"jsdoc/check-examples": "off",    // Disabled until restored in eslint 8 (https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-examples.md#repos-sticky-header)
				"jsdoc/check-indentation": "error",
				"jsdoc/check-line-alignment": "error",
				"jsdoc/check-param-names": "error",
				"jsdoc/check-property-names": "error",
				"jsdoc/check-syntax": "error",
				"jsdoc/check-tag-names": "error",
				"jsdoc/check-types": "error",
				"jsdoc/check-values": "error",
				"jsdoc/empty-tags": "error",
				"jsdoc/implements-on-classes": "error",
				"jsdoc/match-description": "error",
				"jsdoc/match-name": "error",
				"jsdoc/multiline-blocks": "error",
				"jsdoc/no-bad-blocks": "error",
				"jsdoc/no-defaults": "error",
				// "jsdoc/no-missing-syntax": "error",
				"jsdoc/no-multi-asterisks": "error",
				"jsdoc/no-restricted-syntax": "error",
				"jsdoc/no-types": "error",
				"jsdoc/no-undefined-types": "error",
				"jsdoc/require-asterisk-prefix": "error",
				"jsdoc/require-description": "error",
				"jsdoc/require-description-complete-sentence": "error",
				"jsdoc/require-example": "error",
				// "jsdoc/require-file-overview": "error",
				"jsdoc/require-hyphen-before-param-description": "error",
				"jsdoc/require-jsdoc": "error",
				"jsdoc/require-param": "error",
				"jsdoc/require-param-description": "error",
				"jsdoc/require-param-name": "error",
				"jsdoc/require-param-type": "error",
				"jsdoc/require-property": "error",
				"jsdoc/require-property-description": "error",
				"jsdoc/require-property-name": "error",
				"jsdoc/require-property-type": "error",
				"jsdoc/require-returns": "error",
				"jsdoc/require-returns-check": "error",
				"jsdoc/require-returns-description": "error",
				"jsdoc/require-returns-type": "error",
				"jsdoc/require-throws": "error",
				"jsdoc/require-yields": "error",
				"jsdoc/require-yields-check": "error",
				"jsdoc/tag-lines": ["error", "never", {
					"startLines": 1,
					"applyToEndTag": false
				}],
				"jsdoc/valid-types": "error",

				// eslint-plugin-deprecation
				"deprecation/deprecation": "error",

				// Override eslint
				"accessor-pairs": "error",
				"array-bracket-newline": ["error", {
					"multiline": true,
				}],
				"array-bracket-spacing": ["error", "never", {
					"singleValue": true,
				}],
				"arrow-body-style": ["error", "as-needed"],
				"array-callback-return": ["error", {
					"allowImplicit": true,
					"checkForEach": true,
				}],
				"array-element-newline": ["error", {
					"ArrayExpression": "consistent",
					"ArrayPattern": { "multiline": true, "minItems": 3 },
				}],
				"arrow-parens": "error",
				"arrow-spacing": "error",
				"block-scoped-var": "error",
				"block-spacing": ["error", "always"],
				"camelcase": "error",
				"capitalized-comments": ["error", "always", {
					"ignorePattern": "ngOnInit|ngAfterContentInit|ngAfterViewInit|ngOnDestroy"
				}],
				"class-methods-use-this": "off",
				"comma-style": "error",
				"complexity": ["error", {
					"max": 5
				}],
				"computed-property-spacing": "error",
				"consistent-return": "error",
				"consistent-this": "error",
				"constructor-super": "error",
				"curly": [
					"error",
					"multi-line"
				],
				"default-case": "error",
				"default-case-last": "error",
				"dot-location": ["error", "property"],
				"eol-last": "error",
				"eqeqeq": ["error", "always"],
				"func-name-matching": "error",
				"func-names": "error",
				"func-style": "error",
				"function-call-argument-newline": ["error", "consistent"],
				"function-paren-newline": ["error", "multiline-arguments"],
				"generator-star-spacing": "error",
				"guard-for-in": "error",
				"grouped-accessor-pairs": "error",
				"id-denylist": [
					"error",
					"any",
					"Number",
					"number",
					"String",
					"string",
					"Boolean",
					"boolean",
					"Undefined",
					"undefined"
				],
				"id-length": ["error", {
					"min": 2,
					"max": 25,
					"exceptionPatterns": [
						"^_$"
					]
				}],
				"id-match": "error",
				"implicit-arrow-linebreak": "error",
				"key-spacing": "error",
				"line-comment-position": "error",
				"linebreak-style": ["error", "unix"],
				"lines-around-comment": "error",
				"max-depth": "error",
				"max-classes-per-file": ["error", 1],
				"max-len": ["error", {
					"code": 140
				}],
				"max-lines": ["error", 200],
				"max-lines-per-function": "error",
				"max-nested-callbacks": "error",
				"max-statements": "error",
				"max-statements-per-line": "error",
				"multiline-comment-style": "error",
				"multiline-ternary": ["error", "always-multiline"],
				"new-cap": ["error", {
					"capIsNewExceptions": [
						"Component",
						"ContentChild",
						"ContentChildren",
						"Directive",
						"HostListener",
						"HostBinding",
            "Inject",
						"Injectable",
						"Input",
						"NgModule",
						"Output",
						"Pipe",
						"Service",
						"ViewChild",
						"ViewChildren",
					]
				}],
				"new-parens": "error",
				"newline-per-chained-call": "error",
				"no-alert": "error",
				"no-await-in-loop": "error",
				"no-bitwise": "error",
				"no-caller": "error",
				"no-continue": "error",
				"no-console": "error",
				"no-constructor-return": "error",
				"no-div-regex": "error",
				"no-duplicate-case": "error",
				"no-else-return": ["error", {
					"allowElseIf": false
				}],
				"no-eq-null": "error",
				"no-eval": "error",
				"no-extend-native": "error",
				"no-extra-bind": "error",
				"no-extra-label": "error",
				"no-fallthrough": "error",
				"no-floating-decimal": "error",
				"no-global-assign": "error",
				"no-implicit-coercion": "error",
				"no-implicit-globals": "error",
				"no-inline-comments": "error",
				"no-iterator": "error",
				"no-label-var": "error",
				"no-labels": "error",
				"no-lone-blocks": "error",
				"no-lonely-if": "error",
				"no-mixed-operators": "error",
				"no-mixed-spaces-and-tabs": "error",
				"no-multi-assign": "error",
				"no-multi-spaces": "error",
				"no-multi-str": "error",
				"no-multiple-empty-lines": "error",
				"no-negated-condition": "error",
				"no-nested-ternary": "error",
				"no-new": "error",
				"no-new-func": "error",
				"no-new-object": "error",
				"no-new-wrappers": "error",
				"no-nonoctal-decimal-escape": "error",
				"no-octal": "error",
				"no-octal-escape": "error",
				"no-param-reassign": "error",
				"no-plusplus": ["error", {
					"allowForLoopAfterthoughts": true
				}],
				"no-promise-executor-return": "error",
				"no-proto": "error",
				"no-restricted-exports": "error",
				"no-restricted-globals": "error",
				"no-restricted-imports": ["error", {
					"patterns": [
						"../.*",
						"rxjs/Rx",
					]
				}],
				"no-restricted-properties": "error",
				"no-restricted-syntax": "error",
				"no-return-assign": "error",
				"no-script-url": "error",
				"no-self-compare": "error",
				"no-sequences": "error",
				"no-tabs": ["error", {
					"allowIndentationTabs": true
				}],
				"no-template-curly-in-string": "error",
				"no-trailing-spaces": "error",
				"no-undef-init": "error",
				"no-underscore-dangle": "error",
				"no-unmodified-loop-condition": "error",
				"no-unneeded-ternary": "error",
				"no-unreachable-loop": "error",
				"no-unsafe-optional-chaining": "error",
				"no-useless-backreference": "error",
				"no-useless-call": "error",
				"no-useless-computed-key": "error",
				"no-useless-concat": "error",
				"no-useless-rename": "error",
				"no-useless-return": "error",
				"no-unused-expressions": "error",
				"no-var": "error",
				"no-void": "error",
				"no-whitespace-before-property": "error",
				"nonblock-statement-body-position": "error",
				"object-curly-newline": "error",
				"object-property-newline": ["error", {
					"allowAllPropertiesOnSameLine": true
				}],
				"object-shorthand": "error",
				"one-var": ["error", "never"],
				"one-var-declaration-per-line": "error",
				"operator-assignment": "error",
				"operator-linebreak": ["error", "before"],
				"padded-blocks": ["error", "never", {
					"allowSingleLineBlocks": true
				}],
				"padding-line-between-statements": ["error", {
					"blankLine": "always",
					"prev": "*",
					"next": "return"
				}],
				"prefer-arrow-callback": "error",
				"prefer-const": "error",
				"prefer-destructuring": "error",
				"prefer-exponentiation-operator": "error",
				"prefer-named-capture-group": "error",
				"prefer-numeric-literals": "error",
				"prefer-object-spread": "error",
				"prefer-promise-reject-errors": "error",
				"prefer-regex-literals": "error",
				"prefer-rest-params": "error",
				"prefer-spread": "error",
				"prefer-template": "error",
				"quote-props": ["error", "as-needed"],
				"radix": "error",
				"require-atomic-updates": "error",
				"require-unicode-regexp": "off",
				"rest-spread-spacing": "error",
				"semi-spacing": "error",
				"semi-style": "error",
				'sort-imports': ['error', {
					'ignoreDeclarationSort': true,
				}],
				"sort-keys": ["error", "asc", {
					"natural": true,
				}],
				"sort-vars": "error",
				"space-before-blocks": "error",
				"space-in-parens": ["error", "never"],
				"space-unary-ops": "error",
				"spaced-comment": ["error", "always", {
					"markers": [
						"/"
					]
				}],
				"switch-colon-spacing": "error",
				"symbol-description": "error",
				"template-curly-spacing": "error",
				"unicode-bom": "error",
				"vars-on-top": ["error"],
				"wrap-iife": ["error"],
				"wrap-regex": "error",
				"yield-star-spacing": "error",
				"yoda": "error"
			}
		},
		{
			"files": ["*.html"],
			// "parser": "@html-eslint/parser",
			"plugins": [
				// "@angular-eslint/eslint-plugin-template",
				"@html-eslint",
				"html",
			],
			"extends": [
				// "plugin:@angular-eslint/template/all",
				"plugin:@html-eslint/recommended",
			],
			"rules": {
				// "@angular-eslint/template/attributes-order": ["error", {
				// 	alphabetical: true,
				// 	order: [
				// 		"STRUCTURAL_DIRECTIVE",
				// 		"ATTRIBUTE_BINDING",
				// 		"INPUT_BINDING",
				// 		"OUTPUT_BINDING",
				// 		"TWO_WAY_BINDING",
				// 		"TEMPLATE_REFERENCE",
				// 	]
				// }],
				// "@angular-eslint/template/use-track-by-function": "off",
				"@html-eslint/no-inline-styles": "error",
				"@html-eslint/require-meta-charset": "error",
				"@html-eslint/no-target-blank": "error",
				"@html-eslint/require-button-type": "error",
				"@html-eslint/require-meta-description": "error",
				"@html-eslint/no-skip-heading-levels": "error",
				"@html-eslint/require-frame-title": "error",
				"@html-eslint/no-non-scalable-viewport": "error",
				"html/indent": ["error", "tab"],
				"html/report-bad-indent": "error",
			},
		},
		{
			"files": ["*.json"],
			"extends": [
				"plugin:json/recommended-with-comments"
			],
		},
		{
			"files": ["*.md"],
			"extends": [
				"plugin:markdown/recommended"
			],
		},
	],
};
