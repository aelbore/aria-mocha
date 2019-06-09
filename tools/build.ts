import { clean, bundle, TSRollupConfig } from 'aria-build'

(async function() {

  const external = [
    'mocha',
    'istanbul-api',
    'istanbul-lib-hook',
    'istanbul-lib-instrument',
    'istanbul-lib-coverage'
  ]

  const options: TSRollupConfig[] = [
    {
      input: './src/index.ts',
      external,
      output: {
        file: './dist/aria-mocha.es.js',
        format: 'es'
      },
      tsconfig: {
        compilerOptions: {
          declaration: true
        },
        exclude: [
          'examples'
        ]
      }
    },
    {
      input: './src/index.ts',
      external,
      output: {
        file: './dist/aria-mocha.js',
        format: 'cjs'
      }
    }
  ]

  await clean('dist')
  await bundle(options)
})()