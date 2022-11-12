module.exports = {
  extends: ['@vexip-ui/eslint-config'],
  root: true,
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
          'sibling',
          'object',
          'unknown',
          'type'
        ],
        pathGroups: [
          {
            pattern: 'vitest',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: './*.vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/components/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@vexip-ui/**',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['type']
      }
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    'vue/no-v-html': 'off',
    'vue/no-textarea-mustache': 'off'
  },
  overrides: [
    {
      files: ['docs/**'],
      globals: {
        __ROLLBACK_LANG__: 'readonly'
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
    }
  ],
  globals: {
    __VERSION__: 'readonly'
  }
}
