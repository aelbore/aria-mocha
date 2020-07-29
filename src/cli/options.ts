/* istanbul ignore file */

import { CoverageOptions } from '../coverage';

export const DEFAULT_OPTIONS = Object.freeze({
  REPORTERS: 'lcov,html,text-summary',
  CHECK_COVERAGE: false,
  TEST_DIRECTORY: 'src',
  IS_BROWSER: false
})

export interface TestOptions {
  dir?: string
  file?: string
  files?: string | string[]
  src?: string
  coverageOptions?: CoverageOptions
  target?: string
  config?: string
  resolve?: string | boolean
  timeout?: number
}

export interface CommandLineOptions extends Omit<TestOptions, 'coverageOptions'> {
  _?: string[]
  threshold?: string
  checkCoverage?: boolean
  reporters?: string
  includeDir?: string
  browser?: boolean
}

export const getCliOptions = () => {
  const { CHECK_COVERAGE, REPORTERS, TEST_DIRECTORY, IS_BROWSER } = DEFAULT_OPTIONS
  return { 
    package: 'aria-mocha',
    command: 'test',
    options: [
      { alias: '-t, --threshold', description: 'Enable the thresholds' },
      { alias: '-r, --reporters', description: 'Output reporters.', defaultValue: REPORTERS  },
      { alias: '-c, --config', description: 'config file of aria-build. i.e aria.config.ts' },
      { alias: '-d, --dir', description: 'Directory folder of spec or test files. (default: src)', defaultValue: TEST_DIRECTORY  },
      { alias: '--file', description: 'Specify file(s) to be loaded prior to root suite execution' },
      { alias: '--check-coverage', description: 'Enable coverage', defaultValue: CHECK_COVERAGE  },
      { alias: '--include-dir', description: 'Directory folder source (default: src)' },
      { alias: '--timeout', description: 'Timeout threshold value', defaultValue: 1000 },
      { alias: '--browser', description: 'Enable the browser base testing', defaultValue: IS_BROWSER },
      { alias: '--target',  description: 'Target framework or library to build (i.e react, vue or angular)' },
      { alias: '--resolve', description: 'Resolve dependencies' }
    ]
  }
}