// typescript-eslint rules that are the same as built-in eslint rules just with typescript compatibility added.
// js config will get the name as written here, ts config gets the name with '@typescript-eslint/' prepended
const tsJsSharedConfigs = {
  // no unused variables, *unless* they start with an underscore
  'no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
  }],
  'default-param-last': 'error',
  'dot-notation': 'error',
  'no-dupe-class-members': 'error',
  'no-loss-of-precision': 'error',
};

module.exports = {
  root: true,
  overrides: [
    // config for js files
    {
      files: ['**/*.js'],
      extends: [
        'eslint:recommended',
        // disable all eslint rules that might conflict with prettier
        'prettier',
      ],
      rules: {
        ...tsJsSharedConfigs,
      },
    },
    {
      files: ['.eslintrc.js'],
      parserOptions: {
        ecmaVersion: '2018',
      },
      env: {
        node: true,
      },
    },
    // config for both js and ts/tsx files (i.e., base eslint rules that deviate from eslint:recommended)
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      plugins: [
        'prettier',
      ],
      rules: {
        "prettier/prettier": "error",
        'no-await-in-loop': 'error',
        'no-promise-executor-return': 'error',
        'no-template-curly-in-string': 'error',
        'no-unreachable-loop': 'error',
        'require-atomic-updates': 'error',
        'eqeqeq': 'error',
        'no-constant-condition': ['error', { checkLoops: false }],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
        'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
        'no-useless-rename': 'error',
        'object-shorthand': ['error', 'methods'],
        'prefer-numeric-literals': 'error',
        'no-var': 'error',
      },
    },
    // config for ts/tsx files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      plugins: [
        '@typescript-eslint',
        'jsx-a11y',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'react-app',
        'react-app/jest',
        // enable more accessibility checks than react-app enables by default
        'plugin:jsx-a11y/recommended',
        // disable all eslint rules that might conflict with prettier
        'prettier',
      ],
      // rules documentation
      //   https://eslint.org/docs/rules/
      //   https://typescript-eslint.io/rules/
      // NOTE: if there's an equivalent typescript-eslint rule for a built-in eslint rule,
      //       use the typescript-eslint version instead
      rules: {
        // always allow explicit type declarations
        '@typescript-eslint/no-inferrable-types': 'off',
        // don't allow implicit bool conversion
        '@typescript-eslint/strict-boolean-expressions': ['error', {
          allowString: false,
          allowNumber: false,
          allowNullableObject: false,
          // ... rest are false by default
        }],
        // require function return types to be explicitly declared
        '@typescript-eslint/explicit-function-return-type': 'error',
        // require property-style interface functions (since they get better type checking)
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        // enforce naming conventions
        '@typescript-eslint/naming-convention': ['error',
          { // special default case that should always give us an error
            selector: 'default',
            prefix: ['WARNING__NAMING_CONVENTION_LINT_FELL_THROUGH_TO_DEFAULT_CASE'],
            format: ['UPPER_CASE'],
          },
          { // types should be in PascalCase
            selector: ['typeLike'],
            format: ['PascalCase'],
          },
          { // everything else should be in camelCase
            selector: ['variableLike', 'memberLike', 'property', 'method'],
            format: ['camelCase'],
          },
          { // allow const function variables to be PascalCase (for react components)
            selector: ['variable'],
            modifiers: ['const'],
            types: ['function'],
            format: ['camelCase', 'PascalCase'],
          },
          { // allow unused variables to start with underscores
            selector: ['variableLike'],
            modifiers: ['unused'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          { // allow functions to be PascalCase (for react components)
            selector: ['function'],
            format: ['camelCase', 'PascalCase'],
          },
        ],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': ['error', {
          allowConstantLoopConditions: true,
        }],
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': ['error', {
          ignoreConditionalTests: false,
          ignoreMixedLogicalExpressions: false,
        }],
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-readonly-parameter-types': 'warn', // keeping this as a warning for now
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': ['error', {
          ignoreStringArrays: true,
        }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        // require returned promises to be awaited, since it gives better stack traces for error handling
        '@typescript-eslint/return-await': ['error', 'always'],
        // see comment above tsJsSharedConfigs declaration for explanation
        ...Object.fromEntries(Object.entries(tsJsSharedConfigs).map(([k, v]) => [`@typescript-eslint/${k}`, v])),
      },
    },
  ],
};
