import { getTestFiles } from './files'
import { Mocha } from './libs'
import { coverage, CoverageOptions } from './coverage'

const mocha = new Mocha()

export interface TestOptions {
  dir?: string;
  src?: string;
  coverageOptions?: CoverageOptions;
}

export async function cliRun(options?: TestOptions) {
  const { dir, src, coverageOptions } = options

  const files = await getTestFiles(dir)
  const codeCoverage = await coverage(src, coverageOptions)

  await Promise.all(files.map(file => {
    mocha.addFile(file)
  }))
  
  mocha.run() 
    .on('end', () => codeCoverage.report())
}