import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    commaDangle: 'always-multiline',
  }),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
)
