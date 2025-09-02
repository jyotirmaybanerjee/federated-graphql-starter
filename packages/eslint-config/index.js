module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier'
    ],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'import/order': ['warn', {
        groups: ['builtin', 'external', 'internal'],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }]
    },
    ignorePatterns: ['dist', 'node_modules'],
  };
  