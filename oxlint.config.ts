import { defineConfig } from "oxlint"

export default defineConfig({
    categories: {
        correctness: "error",
        pedantic: "error",
        perf: "error",
        restriction: "error",
        style: "error",
        suspicious: "error",
    },
    options: {
        typeAware: true,
        typeCheck: true,
    },
    rules: {
        "eslint/id-length": [
            "error",
            {
                exceptions: ["x", "y"],
            },
        ],
        "eslint/max-lines-per-function": ["error", { max: 200 }],
        "eslint/max-params": ["error", { max: 5 }],
        "eslint/max-statements": ["error", { max: 20 }],
        "eslint/no-continue": "allow",
        "eslint/no-magic-numbers": "allow",
        "eslint/no-plusplus": "allow",
        "eslint/no-ternary": "allow",
        "eslint/no-undefined": "allow",
        "eslint/sort-imports": "allow",
        "oxc/no-async-await": "allow",
        "oxc/no-optional-chaining": "allow",
        "oxc/no-rest-spread-properties": "allow",
        "typescript/consistent-return": "allow",
        "typescript/consistent-type-definitions": ["error", "type"],
        "typescript/explicit-function-return-type": "allow",
        "typescript/explicit-module-boundary-types": "allow",
        "typescript/no-non-null-assertion": "error",
        "typescript/prefer-readonly-parameter-types": "allow",
        "typescript/promise-function-async": "allow",
        "unicorn/filename-case": [
            "error",
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
    },
})
