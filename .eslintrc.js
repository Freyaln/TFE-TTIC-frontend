module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // uses react-specific linting rules
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended', // uses typescript-specific linting rules
        'prettier', // disables react-specific linting rules that conflict with prettier
        'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 6,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"]
    },
};
