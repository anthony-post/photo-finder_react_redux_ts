module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false
    }
  },
  plugins: ['react', 'react-hooks', 'react-refresh', 'import', 'prettier'],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'error',
    'no-unused-expressions': 'error',
    curly: ['error', 'all'],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ]
      }
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react/jsx-uses-react': 'off',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react-refresh/only-export-components': 'off'
  }
};
