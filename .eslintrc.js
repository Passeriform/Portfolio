module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "overrides": [
      {
        "files": [
          "*.ts"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "ecmaVersion": 2020, // Allows for the parsing of modern ECMAScript features
          "project": ["tsconfig.json", "tsconfig.app.json"],
          "sourceType": "module",
          "createDefaultProgram": true
        },
        "extends": [
          "plugin:@angular-eslint/recommended",
          "plugin:@angular-eslint/template/process-inline-templates"
        ],
        "plugins": [
          "@angular-eslint/eslint-plugin",
          "eslint-plugin-import",
          "eslint-plugin-unicorn",
          "eslint-plugin-no-null",
          "eslint-plugin-jsdoc",
          "eslint-plugin-prefer-arrow",
          "eslint-plugin-deprecation",
          "@typescript-eslint",
          "@typescript-eslint/tslint"
        ],
        "rules": {
            "@angular-eslint/component-class-suffix": "error",
            "@angular-eslint/component-max-inline-declarations": "error",
            "@angular-eslint/component-selector": [
                "error",
                {
                    "type": "element",
                    "prefix": "app",
                    "style": "kebab-case"
                }
            ],
            "@angular-eslint/contextual-lifecycle": "error",
            "@angular-eslint/directive-class-suffix": "error",
            "@angular-eslint/directive-selector": [
                "error",
                {
                    "type": "attribute",
                    "prefix": "app",
                    "style": "camelCase"
                }
            ],
            "@angular-eslint/no-conflicting-lifecycle": "error",
            "@angular-eslint/no-host-metadata-property": "error",
            "@angular-eslint/no-input-rename": "error",
            "@angular-eslint/no-inputs-metadata-property": "error",
            "@angular-eslint/no-output-native": "error",
            "@angular-eslint/no-output-on-prefix": "error",
            "@angular-eslint/no-output-rename": "error",
            "@angular-eslint/no-outputs-metadata-property": "error",
            "@angular-eslint/use-component-view-encapsulation": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
            "@angular-eslint/use-pipe-transform-interface": "error",
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/array-type": [
                "error",
                {
                    "default": "array"
                }
            ],
            // "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/ban-types": [
                "error",
                {
                    "types": {
                        "Object": {
                            "message": "Avoid using the `Object` type. Did you mean `object`?"
                        },
                        "Function": {
                            "message": "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                        },
                        "Boolean": {
                            "message": "Avoid using the `Boolean` type. Did you mean `boolean`?"
                        },
                        "Number": {
                            "message": "Avoid using the `Number` type. Did you mean `number`?"
                        },
                        "String": {
                            "message": "Avoid using the `String` type. Did you mean `string`?"
                        },
                        "Symbol": {
                            "message": "Avoid using the `Symbol` type. Did you mean `symbol`?"
                        }
                    }
                }
            ],
            "@typescript-eslint/consistent-type-assertions": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/dot-notation": "error",
            "@typescript-eslint/explicit-member-accessibility": [
                "off",
                {
                    "accessibility": "explicit"
                }
            ],
            "@typescript-eslint/indent": [
                "error",
                "tab",
                {
                    "CallExpression": {
                        "arguments": "first"
                    },
                    "ArrayExpression": "first",
                    "ObjectExpression": "first",
                    "FunctionDeclaration": {
                        "parameters": "first"
                    },
                    "FunctionExpression": {
                        "parameters": "first"
                    }
                }
            ],
            "@typescript-eslint/member-delimiter-style": [
                "error",
                {
                    "multiline": {
                        "delimiter": "semi",
                        "requireLast": true
                    },
                    "singleline": {
                        "delimiter": "semi",
                        "requireLast": false
                    }
                }
            ],
            "@typescript-eslint/member-ordering": "error",
            // "@typescript-eslint/naming-convention": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-extraneous-class": "error",
            // "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-inferrable-types": [
                "error",
                {
                    "ignoreParameters": true
                }
            ],
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-namespace": "error",
            "@typescript-eslint/no-non-null-assertion": "error",
            "@typescript-eslint/no-parameter-properties": "off",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-shadow": [
                "error",
                {
                    "hoist": "all"
                }
            ],
            "@typescript-eslint/no-this-alias": "error",
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/prefer-for-of": "error",
            "@typescript-eslint/prefer-function-type": "error",
            "@typescript-eslint/prefer-namespace-keyword": "error",
            "@typescript-eslint/prefer-readonly": "error",
            "@typescript-eslint/quotes": [
                "error",
                "single"
            ],
            "@typescript-eslint/require-await": "error",
            "@typescript-eslint/semi": [
                "error",
                "always"
            ],
            "@typescript-eslint/triple-slash-reference": [
                "error",
                {
                    "path": "always",
                    "types": "prefer-import",
                    "lib": "always"
                }
            ],
            "@typescript-eslint/type-annotation-spacing": "error",
            "@typescript-eslint/unified-signatures": "error",
            "arrow-body-style": [
                "error",
                "always"
            ],
            "arrow-parens": [
                "error",
                "always"
            ],
            "brace-style": [
                "error",
                "1tbs"
            ],
            "comma-dangle": [
                "error",
                {
                    "objects": "always-multiline",
                    "arrays": "always-multiline"
                }
            ],
            "complexity": [
                "error",
                {
                    "max": 5
                }
            ],
            "constructor-super": "error",
            "curly": [
                "error",
                "multi-line"
            ],
            "default-case": "error",
            "dot-notation": "error",
            "eol-last": "error",
            "eqeqeq": [
                "error",
                "always"
            ],
            "guard-for-in": "error",
            "id-blacklist": [
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
            "id-match": "error",
            "import/no-default-export": "error",
            "import/no-deprecated": "error",
            "import/order": "error",
            "indent": [
              "error",
              "tab",
              {
                  "CallExpression": {
                      "arguments": "first"
                  },
                  "ArrayExpression": "first",
                  "ObjectExpression": "first",
                  "FunctionDeclaration": {
                      "parameters": "first"
                  },
                  "FunctionExpression": {
                      "parameters": "first"
                  }
              }
            ],
            "jsdoc/check-alignment": "error",
            "jsdoc/check-indentation": "error",
            "jsdoc/newline-after-description": "error",
            "jsdoc/no-types": "error",
            "linebreak-style": [
                "error",
                "unix"
            ],
            "max-classes-per-file": [
                "error",
                1
            ],
            "max-len": [
                "error",
                {
                    "code": 140
                }
            ],
            "max-lines": [
                "error",
                200
            ],
            "new-parens": "error",
            "no-bitwise": "error",
            "no-caller": "error",
            "no-cond-assign": "error",
            "no-console": [
                "error",
                {
                    "allow": [
                        "log",
                        "warn",
                        "dir",
                        "timeLog",
                        "assert",
                        "clear",
                        "count",
                        "countReset",
                        "group",
                        "groupEnd",
                        "table",
                        "dirxml",
                        "error",
                        "groupCollapsed",
                        "Console",
                        "profile",
                        "profileEnd",
                        "timeStamp",
                        "context"
                    ]
                }
            ],
            "no-debugger": "error",
            "no-duplicate-case": "error",
            "no-duplicate-imports": "error",
            "no-empty": "off",
            "no-empty-function": "off",
            "no-eval": "error",
            "no-extra-bind": "error",
            "no-fallthrough": "error",
            "no-invalid-this": "error",
            "no-irregular-whitespace": "error",
            "no-multiple-empty-lines": "error",
            "no-new-wrappers": "error",
            "no-null/no-null": "error",
            "no-param-reassign": "error",
            "no-plusplus": [
                "off",
                {
                    "allowForLoopAfterthoughts": true
                }
            ],
            "no-redeclare": "error",
            "no-restricted-imports": [
                "error",
                "rxjs/Rx"
            ],
            "no-restricted-syntax": [
                "error",
                "ForInStatement"
            ],
            "no-return-await": "error",
            "no-sequences": "error",
            "no-shadow": "error",
            "no-template-curly-in-string": "error",
            "no-throw-literal": "error",
            "no-trailing-spaces": "error",
            "no-undef-init": "error",
            "no-underscore-dangle": "error",
            "no-unsafe-finally": "error",
            "no-unused-expressions": "error",
            "no-unused-labels": "error",
            "no-use-before-define": "error",
            "no-var": "error",
            "no-void": "error",
            "object-shorthand": "error",
            "one-var": [
                "error",
                "never"
            ],
            "padding-line-between-statements": [
                "error",
                {
                    "blankLine": "always",
                    "prev": "*",
                    "next": "return"
                }
            ],
            "prefer-arrow/prefer-arrow-functions": "error",
            "prefer-const": "error",
            "prefer-object-spread": "error",
            "prefer-template": "error",
            "quote-props": [
                "error",
                "as-needed"
            ],
            "quotes": "error",
            "radix": "error",
            "require-await": "error",
            "semi": "error",
            "space-before-function-paren": [
                "error",
                {
                    "anonymous": "never",
                    "asyncArrow": "always",
                    "named": "never"
                }
            ],
            "space-in-parens": [
                "error",
                "never"
            ],
            "spaced-comment": [
                "error",
                "always",
                {
                    "markers": [
                        "/"
                    ]
                }
            ],
            "unicorn/filename-case": "error",
            "unicorn/prefer-switch": "error",
            "unicorn/prefer-ternary": "error",
            "use-isnan": "error",
            "valid-typeof": "off",
            "yoda": "error",
            "@typescript-eslint/tslint/config": [
                "error",
                {
                    "rules": {
                        "import-spacing": true,
                        "no-default-import": true,
                        "no-inferred-empty-object-type": true,
                        "no-null-undefined-union": true,
                        "no-promise-as-boolean": true,
                        "no-restricted-globals": true,
                        "no-sparse-array": true,
                        "no-unsafe-any": true,
                        "number-literal-format": true,
                        "object-literal-sort-keys": [
                            true,
                            "ignore-blank-lines",
                            "ignore-case",
                            "match-declaration-order",
                            "shorthand-first"
                        ],
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
            ]
        }
      },
      {
        "files": [
          "*.component.html"
        ],
        "parser": "@angular-eslint/template-parser",
        "plugins": ["@angular-eslint/template"],
        "rules": {
            "@angular-eslint/template/banana-in-a-box": "error",
            "@angular-eslint/template/eqeqeq": "error",
            "@angular-eslint/template/no-negated-async": "error",
        },
        "extends": [
          "plugin:@angular-eslint/template/recommended"
        ],
      }
    ],
};
