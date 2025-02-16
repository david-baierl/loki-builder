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
      // ---------------------------------------------------
      // misc
      // ---------------------------------------------------

      // this is only checking reactivity with a naming convention
      // this is more anoying than helpful
      'solid/reactivity': 0,

      // disable other common rules
      '@stylistic/jsx-one-expression-per-line': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-empty-object-type': 0,

      // enamble more strict rules
      '@typescript-eslint/no-shadow': 'error',

      // ---------------------------------------------------
      // file and folder structure
      // ---------------------------------------------------

      'no-restricted-imports': ['error', {
        patterns: [{
          group: [
            // forbid accesses to non exported private children
            '*/*/*',

            // allow index files of all types
            // that can not be exportable elsewhere (like css)
            '!*/*/index.*',

            // allow type imports
            // for some circular dependency problems that are caused by barrel files
            '!**/types',

            // allow absolut paths from the src root,
            // there are some cases there this is nessesary
            '!~/**',

            // allow libaries
            '!@*/**',

            // ignore debug paths
            '!~debug/**',

            // but still block everything that is starting with an underscore
            '*/**/_*',
            '!./_*',
          ],
          message: [
            '',
            'importing private child modules is forbidden,',
            'try exporting modules to make them public',
          ].join('\n'),
        }],
      }],
    },
  },
)
