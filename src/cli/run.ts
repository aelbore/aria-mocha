import { getTestFiles } from '../fs/fs'
import { Mocha } from '../libs'
import { coverage } from '../coverage'

import { TestOptions } from './options'

export async function cliRun(options: TestOptions) {
  const mocha = new Mocha({ timeout: options.timeout })
  const { src, coverageOptions } = options

  const files = Array.isArray(options.files) 
    ? options.files
    : await getTestFiles(options.files, true)

  const codeCoverage = await coverage(src, coverageOptions)

  await Promise.all(files.map(file => {
    mocha.addFile(file)
  }))

  mocha.run((failures) => !failures || process.exit(1)) 
    .on('end', () =>  {
      codeCoverage.report()
    })
}