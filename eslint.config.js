import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'jsx-quotes': ['error', 'prefer-single'],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
	{
		ignores: ['dist/', 'node_modules/', 'coverage/', 'build/'],
	},
);
