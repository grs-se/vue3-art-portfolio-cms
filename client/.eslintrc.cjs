/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		// "@vue/typescript/recommended",
		// "plugin:vue/vue3-recommended",
		// "@vue/standard",
		///////
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier",
		"plugin:vitest-globals/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	env: {
		"vitest-globals/env": true,
		"vue/setup-compiler-macros": true,
		"vue/multi-word-component-names": false,
	},
	rules: {
		"prettier/prettier": [
			"error",
			{
				useTabs: true,
				endOfLine: "auto",
			},
		],
		"@typescript-eslint/no-unused-vars": "error",
		"vue/script-setup-uses-vars": "error",
	},
};
