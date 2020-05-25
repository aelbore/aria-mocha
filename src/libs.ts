/* istanbul ignore file */

import * as Mocha from 'mocha'
import * as Istanbul from 'istanbul-api'
import * as ariafs$ from 'aria-fs'

interface ConfigOptions {
  loadObject: (obj: any, overrides?: any) => any
}

const config: ConfigOptions = {
  loadObject: Istanbul.config.loadObject
}

const createReporter = (cfg: any, opts: any) => {
  return Istanbul.createReporter(cfg, opts)
}

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
export { config, createReporter, ConfigOptions, getInstanbul }
export { Mocha }

export * as puppeteer from 'puppeteer'

export const globFiles = ariafs$.globFiles