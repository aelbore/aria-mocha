import { DEFAULT_OPTIONS } from './cli-options'
import { handler } from './cli-handler'

export async function run(version: string) {
  const program = require('sade')('aria-mocha', true)

  program
    .version(version)
    .option('-d, --dir', 'Directory folder of spec or test files. (default: src)', DEFAULT_OPTIONS.TEST_DIRECTORY)
    .option('-t, --threshold', 'Enable the thresholds')
    .option('-r, --reporters', 'Output reporters.', DEFAULT_OPTIONS.REPORTERS)
    .option('-c, --config', 'config file of aria-build. i.e aria.config.ts')
    .option('--check-coverage', 'Enable coverage', DEFAULT_OPTIONS.CHECK_COVERAGE)
    .option('--include-dir', 'Directory folder source (default: src)')
    .option('--browser', 'Enable the browser base testing', false)
    .option('--target', 'Target framework or library to build (i.e react, vue or angular)')
    .option('--resolve', 'Resolve dependencies')
    .action(handler)
    .parse(process.argv)
}