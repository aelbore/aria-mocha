import { CoverageOptions } from './coverage';

export interface TestOptions {
  dir?: string;
  src?: string;
  coverageOptions?: CoverageOptions;
}

export interface TestCustomOptions extends TestOptions {
  files: string[]
}

export const DEFAULT_OPTIONS = Object.freeze({
  REPORTERS: 'lcov,html,text-summary',
  CHECK_COVERAGE: false,
  TEST_DIRECTORY: 'src',
  IS_BROWSER: false
})

export interface CommandLineOptions {
  dir?: string;
  src?: string;
  browser?: boolean;
  threshold?: string;
  checkCoverage?: boolean;
  reporters?: string;
  includeDir?: string;
}