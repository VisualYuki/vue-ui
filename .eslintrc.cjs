/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting'],
	overrides: [
		{
			files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
			extends: ['plugin:cypress/recommended']
		}
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/block-lang': [
			'error',
			{
				script: {
					lang: 'ts'
				}
			}
		],
		// 'vue/define-macros-order': [
		// 	'error',
		// 	{
		// 		order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
		// 		defineExposeLast: false
		// 	}
		// ]
	}
}