import * as Mocha from 'mocha'

import { getTestFiles } from './files'
import { coverage, CoverageOptions } from './coverage'

const mocha = new Mocha()

export interface TestOptions {
  src?: string;
  coverageOptions?: CoverageOptions;
}

export async function run(dir: string, options: TestOptions = {}) {
  const src = options.src ? options.src : 'src'

  const files = await getTestFiles(dir)
  const codeCoverage = await coverage(src, options.coverageOptions)

  await Promise.all(files.map(file => {
    mocha.addFile(file)
  }))
  
  mocha.run() 
    .on('end', () => codeCoverage.report())
}
