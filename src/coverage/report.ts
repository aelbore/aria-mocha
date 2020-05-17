import { createCoverageMap } from '../libs'

import { CoverageOptions } from './coverage'
import { reportCoverage } from './report-coverage'
import { addFileCoverage } from './add-file-coverage'

declare var global: any;

export async function report(options?: CoverageOptions) {
  const coverageVar = global.__coverage__

  const coverageMap = createCoverageMap()
  await addFileCoverage(coverageMap, coverageVar)
  await reportCoverage(coverageMap, options)
}