module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:mocha/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['chai-friendly', 'mocha', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': ['error'],
    'no-trailing-spaces': ['error'],
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': [2, 'single', 'avoid-escape'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'camelcase': 'error',
    'no-console': ['error'],
    'semi': 'error',
    'no-await-in-loop': 'error',
    'no-constructor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-use-before-define': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'no-duplicate-imports': 'error',
    'block-scoped-var': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'no-else-return': 'error',
    'no-var': 'error',
    'mocha/no-mocha-arrows': 0,
    'mocha/no-setup-in-describe': 0,
    'chai-friendly/no-unused-expressions': 2,
    'prefer-const': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
  },
};
