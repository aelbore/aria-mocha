import { CoverageOptions } from './common';

export const DEFAULT_OPTIONS = Object.freeze({
  REPORTERS: 'lcov,html,text-summary',
  CHECK_COVERAGE: false,
  TEST_DIRECTORY: 'src'
})

export interface CommandLineOptions {
  dir?: string;
  src?: string;
  threshold?: string;
  checkCoverage?: boolean;
  reporters?: string;
  includeDir?: string;
}

export interface TestOptions {
  dir?: string;
  src?: string;
  coverageOptions?: CoverageOptions;
}