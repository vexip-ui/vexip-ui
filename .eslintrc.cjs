const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: ['@vexip-ui/eslint-config'],
  root: true,
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'vue/no-v-html': 'off',
    'vue/no-textarea-mustache': 'off'
  },
  overrides: [
    {
      files: ['components/**/*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false
          }
        ],
        'vue/component-tags-order': [
          'error',
          {
            order: [['template', 'script']]
          }
        ],
        'vue/no-restricted-block': [
          'error',
          {
            element: '/[^(template|script)]/',
            message: 'Do not use blocks other than <template> or <script>.'
          }
        ]
      }
    },
    {
      files: ['**/*.spec.tsx'],
      rules: {
        'react/jsx-key': 'off'
      }
    },
    {
      files: ['docs/demos/**'],
      globals: {
        __ROLLBACK_LANG__: 'readonly'
      },
      rules: {
        'import/order': 'off'
      }
    },
    {
      files: ['dev-server/**'],
      globals: {
        __DEMOS__: 'readonly',
        __TARGET__: 'readonly',
        __THEME__: 'readonly',
        __PORT__: 'readonly'
      }
    },
    {
      files: ['scripts/**'],
      rules: {
        'no-sequences': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['**/*.md/*.*'],
      rules: {
        'import/order': 'off'
      }
    }
  ],
  globals: {
    __VERSION__: 'readonly'
  }
})
