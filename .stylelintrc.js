module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order'
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  rules: {
    'no-empty-source': process.env.NODE_ENV === 'production' ? true : null,
    'block-no-empty': process.env.NODE_ENV === 'production' ? true : null,
    'string-quotes': 'single',
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'declaration-property-value-disallowed-list': {
      '/^transition/': ['/all/'],
      '/^background/': ['http:', 'https:'],
      '/^border/': ['none'],
      '/.+/': ['initial']
    },
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['blockless-after-same-name-blockless']
      }
    ],
    'no-descending-specificity': null,
    'custom-property-empty-line-before': null,
    'selector-class-pattern': [
      '^([#a-z][$#{}a-z0-9]*)((-{1,2}|_{2})[$#{}a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'keyframes-name-pattern': [
      '^([#a-z][$#{}a-z0-9]*)((-{1,2}|_{2})[$#{}a-z0-9]+)*$',
      {
        message: 'Expected keyframe name to be kebab-case'
      }
    ],
    'color-function-notation': null,
    'scss/at-import-partial-extension': 'always'
  },
  ignoreFiles: [
    /* see .stylelintignore */
  ]
}
