import { defineConfig } from 'eslint/config'
import factory from '@vexip-ui/eslint-config'

export default defineConfig([
  {
    ignores: [
      '**/es',
      '**/lib',
      '**/css',
      '**/cache',
      '**/.husky',
      '**/templates',

      '**/*.css',
      '**/*.pcss',
      '**/*.scss',
      '**/*.svg',

      '**/common/icons/vue',
      '**/common/icons/types',

      '**/dev-server/play*.vue',
    ],
  },
  {
    extends: [factory()],
    languageOptions: {
      globals: {
        __VERSION__: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      'vue/no-v-html': 'off',
      'vue/no-textarea-mustache': 'off',
      'react/jsx-key': 'off',
    },
  },
  {
    files: ['**/scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['components/**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: [['template', 'script']],
        },
      ],
      'vue/no-restricted-block': [
        'error',
        {
          element: '/[^(template|script)]/',
          message: 'Do not use blocks other than <template> or <script>.',
        },
      ],
    },
  },
  {
    files: ['**/*.spec.tsx'],
    rules: {
      'prefer-regex-literals': 'off',
    },
  },
  {
    files: ['docs/demos/**'],
    languageOptions: {
      globals: {
        __ROLLBACK_LANG__: 'readonly',
      },
    },
    rules: {
      'import/order': 'off',
    },
  },
  {
    files: ['dev-server/**'],
    languageOptions: {
      globals: {
        __DEMOS__: 'readonly',
        __TARGET__: 'readonly',
        __THEME__: 'readonly',
        __PORT__: 'readonly',
      },
    },
  },
  {
    files: ['scripts/**'],
    rules: {
      'no-sequences': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.md/*.*'],
    rules: {
      'import/order': 'off',
    },
  },
])
