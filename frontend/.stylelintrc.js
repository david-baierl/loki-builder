export default {
  files: [
    '**/*',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
  ],
  rules: {
    'property-no-vendor-prefix': null,
    'scss/at-mixin-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'no-invalid-double-slash-comments': true,
      },
    },
  ],
}
