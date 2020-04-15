import { DEFAULT_OPTIONS, handler } from './cli/cli'

export * from './cli/cli'

export async function run(version: string) {
  const { TEST_DIRECTORY, REPORTERS, CHECK_COVERAGE } = DEFAULT_OPTIONS
  
  const program = require('sade')('aria-mocha', true)
  program
    .version(version)
    .option('-d, --dir', 'Directory folder of spec or test files. (default: src)', TEST_DIRECTORY)
    .option('-t, --threshold', 'Enable the thresholds')
    .option('-r, --reporters', 'Output reporters.', REPORTERS)
    .option('-c, --config', 'config file of aria-build. i.e aria.config.ts')
    .option('--file', 'Specify file(s) to be loaded prior to root suite execution')
    .option('--check-coverage', 'Enable coverage', CHECK_COVERAGE)
    .option('--include-dir', 'Directory folder source (default: src)')
    .option('--browser', 'Enable the browser base testing', false)
    .option('--target', 'Target framework or library to build (i.e react, vue or angular)')
    .option('--resolve', 'Resolve dependencies')
    .action(handler)
    .parse(process.argv)
}