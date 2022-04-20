module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // set of rules which are recommended for all projects by the ESLint Team
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended', // Adjust the one from eslint appropriately for TypeScript
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Disabled the 'no-unused-vars' error (typescript/no-unused-vars is used instead)
    'no-unused-vars': 'off',
    // Applying same rules as dex-react.
    // For some reason I don't find anything specific for this in dex-react
    // But here I have to set this manually...
    'space-before-function-paren': 'off',
    'comma-dangle': ['error', 'always-multiline'],
  },
  plugins: [],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    VERSION: true,
  },
  extends: ['standard'],
  overrides: [
    {
      files: ['**/*.test.ts'],
      env: {
        jest: true,
      },
    },
  ],
}
