import * as path from 'path'
import { clean, bundle, globFiles, copyFiles, TSRollupConfig } from 'aria-build'

(async function() {
  const binFiles = await globFiles('bin/**/*')

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
        file: './dist/aria-mocha.js',
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
    }
  ]

  await clean('dist')
  await bundle(options)
  await Promise.all(binFiles.map(binFile => {
    return copyFiles(binFile, path.join('dist', 'bin'))
  }))
})()