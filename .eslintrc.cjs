module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        indent: 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        eqeqeq: 'off',
        'no-bitwise': 'off',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
}
