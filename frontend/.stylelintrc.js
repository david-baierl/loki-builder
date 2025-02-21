export default {
  files: [
    '**/*',
  ],
  extends: [
    'stylelint-config-standard',
  ],
  rules: {
    'property-no-vendor-prefix': null,
  },
  overrides: [
    {
      files: [
        '*.scss',
      ],
      extends: [
        'stylelint-config-standard-scss',
      ],
      rules: {
        'scss/at-mixin-pattern': null,
        'scss/dollar-variable-pattern': null,
        'scss/dollar-variable-empty-line-before': null,
      },
    },
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      customSyntax: '@linaria/postcss-linaria',
      rules: {
        'declaration-property-value-no-unknown': [true, {
          ignoreProperties: { '/.+/': [/pcss_lin/] },
        }],
        'no-invalid-double-slash-comments': true,
      },
    },
  ],
}
