/* istanbul ignore file */

import Mocha from 'mocha'
import * as ariafs$ from 'aria-fs'

const getInstanbul = async () => {
  const { config, createReporter } = await import('istanbul-api')
  return {
    config,
    createReporter
  }
}

export { CoverageMap, createCoverageMap, CoverageSummary } from 'istanbul-lib-coverage'
export { hookRequire, TransformerOptions } from 'istanbul-lib-hook'
export { createInstrumenter } from 'istanbul-lib-instrument'
export { getInstanbul }
export { Mocha }

export const globFiles = ariafs$.globFiles