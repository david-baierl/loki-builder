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
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'no-invalid-double-slash-comments': true,
      },
    },
  ],
}
