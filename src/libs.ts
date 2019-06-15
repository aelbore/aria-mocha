import * as Mocha from 'mocha'
import * as Istanbul from 'istanbul-api'

interface ConfigOptions {
  loadObject: (obj: any, overrides?: any) => any
}

const config: ConfigOptions = {
  loadObject: Istanbul.config.loadObject
}

const createReporter = (cfg: any, opts: any) => {
  return Istanbul.createReporter(cfg, opts)
}

export { CoverageMap, createCoverageMap, CoverageSummary } from 'istanbul-lib-coverage'
export { hookRequire, TransformerOptions } from 'istanbul-lib-hook'
export { createInstrumenter } from 'istanbul-lib-instrument'
export { globFiles } from 'aria-fs'
export { config, createReporter, ConfigOptions }
export { Mocha }
