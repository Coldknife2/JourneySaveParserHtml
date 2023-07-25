// eslint-disable-next-line
module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"parser": "@typescript-eslint/parser",
		"ecmaVersion": "latest",
		"sourceType" : "module"
	},
	"plugins": [
		"vue",
		"@typescript-eslint"
	],
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
		"vue/multi-word-component-names": ["error", {
			"ignores": ["index", "stats", "editor", "about", "error"]
		}],
		"no-undef" : [
			"off"
		],
		"indent": [
			"error",
			"tab",
			{ "SwitchCase" : 1 }
		],
		"linebreak-style": [
			"error",
			"unix"
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
