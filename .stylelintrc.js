module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-scss',
    'stylelint-prettier'
  ],
  rules: {
    'no-empty-source': process.env.NODE_ENV === 'production' ? true : null,
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'declaration-property-value-blacklist': {
      '/^transition/': ['/all/'],
      '/^background/': ['http:', 'https:'],
      '/^border/': ['none'],
      '/.+/': ['initial']
    },
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'each',
          'error',
          'return'
        ]
      }
    ],
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested']
      }
    ]
  }
}
