import { parseCoverageOptions, updateOptios } from './cli-utils'
import { CommandLineOptions, DEFAULT_OPTIONS } from './cli-options'
import { cliRun } from './cli-run'

export async function run(version: string) {
  const program = require('sade')('aria-mocha', true)

  program
    .version(version)
    .option('-d, --dir', 'Directory folder of spec or test files. (default: src)', DEFAULT_OPTIONS.TEST_DIRECTORY)
    .option('-t, --threshold', 'Enable the thresholds')
    .option('-r, --reporters', 'Output reporters.', DEFAULT_OPTIONS.REPORTERS)
    .option('--check-coverage', 'Enable coverage', DEFAULT_OPTIONS.CHECK_COVERAGE)
    .option('--include-dir', 'Directory folder source (default: src)')
    .action(handler)
    .parse(process.argv)

  async function handler(opts?: CommandLineOptions) {
    const options = updateOptios(opts);
    const coverageOptions = parseCoverageOptions(options)
    await cliRun(coverageOptions)
  }
}