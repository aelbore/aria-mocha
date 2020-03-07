import { CoverageOptions } from './coverage';

export const DEFAULT_OPTIONS = Object.freeze({
  REPORTERS: 'lcov,html,text-summary',
  CHECK_COVERAGE: false,
  TEST_DIRECTORY: 'src'
})

export interface TestOptions {
  dir?: string
  src?: string
  coverageOptions?: CoverageOptions
  target?: string
  config?: string
  resolve?: string | boolean
}

export interface CommandLineOptions extends Omit<TestOptions, 'coverageOptions'> {
  threshold?: string
  checkCoverage?: boolean
  reporters?: string
  includeDir?: string
  browser?: boolean
}

export { TestAriaConfigOptions } from 'aria-build'