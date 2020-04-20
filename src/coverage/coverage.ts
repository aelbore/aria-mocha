import { ThresholdOptions } from './check-threshold'
import { setup } from './setup'
import { report } from './report'

export interface CoverageOptions {
  thresholds?: ThresholdOptions;
  reporters?: string[];
  checkCoverage?: boolean;
}

export async function coverage(src: string, options?: CoverageOptions) {
  options?.checkCoverage 
    && await setup(src)

  return {
    report() {
      options?.checkCoverage
        && report(options)
    }
  }
}