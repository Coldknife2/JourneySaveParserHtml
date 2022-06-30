require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	"root": true,
	"parser": "vue-eslint-parser",
	"env": {
		"browser": true,
		"es2021": true,
		"node" : true,
		"vue/setup-compiler-macros": true
	},
	"parserOptions": {
		"parser": "@typescript-eslint/parser",
		"ecmaVersion": "latest",
		"sourceType" : "module"
	},
	"extends": [
		"@vue/eslint-config-typescript/recommended",
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
	],
	"plugins": [
		"vue",
	],
	"ignorePatterns": ["**/dist/", "*.d.ts"],
	"rules": {
		"vue/max-attributes-per-line": ["error", {
			"singleline": { "max": 3 },
			"multiline": { "max": 3 }
		}],
		"vue/html-indent": ["error", "tab", {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
			"ignores": []
		}],
		"indent": [
			"error",
			"tab",
			{ "SwitchCase" : 1 }
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"brace-style": [
			"error",
			"1tbs",
			{ "allowSingleLine": true }
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"no-return-assign": [
			"error",
			"always"
		],
		"object-curly-spacing": [
			"error",
			"always"
		],
		"curly": [
			"error",
			"all"
		],
		"comma-spacing": [
			"error"
		],
		"array-bracket-spacing": [
			"error",
			"never"
		],
		"space-before-blocks": [
			"error",
			"always"
		],
		"block-spacing": [
			"error",
			"always"
		],
		"no-trailing-spaces": [
			"error"
		],
		"eol-last": [
			"error"
		],
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 2,
				"maxBOF": 0,
				"maxEOF": 1
			}
		]
	}
};
