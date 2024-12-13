import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid'

export default tseslint.config(
  {
    ignores: ['gen/*', 'dist/*'],
  },
  tseslint.configs.recommended,
  solid.configs['flat/typescript'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    commaDangle: 'always-multiline',
  }),
  {
    rules: {
      'solid/reactivity': 0,
      '@stylistic/jsx-one-expression-per-line': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
