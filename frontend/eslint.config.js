import stylistic from '@stylistic/eslint-plugin'

const config = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  jsx: true,
  commaDangle: 'always-multiline',
})

export default [
  {
    ...config,
    rules: {
      ...config.rules,
    },
  },
]
