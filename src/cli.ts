import { DEFAULT_OPTIONS } from './cli-options'
import { handler } from './cli-handler'

export async function run(version: string) {
  const program = require('sade')('aria-mocha', true)

  program
    .version(version)
    .option('-d, --dir', 'Directory folder of spec or test files. (default: src)', DEFAULT_OPTIONS.TEST_DIRECTORY)
    .option('-t, --threshold', 'Enable the thresholds')
    .option('-r, --reporters', 'Output reporters.', DEFAULT_OPTIONS.REPORTERS)
    .option('--check-coverage', 'Enable coverage', DEFAULT_OPTIONS.CHECK_COVERAGE)
    .option('--include-dir', 'Directory folder source (default: src)')
    .option('--browser', 'Enable the browser base testing', false)
    .action(handler)
    .parse(process.argv)
}