import { resolve } from 'path'
import { CoverageMap, getInstanbul } from '../libs'

import { CoverageOptions } from './coverage'
import { checkThreshold } from './check-threshold'

export async function reportCoverage(coverageMap: CoverageMap, options: CoverageOptions) {
  const { config, createReporter } = await getInstanbul()

  const thresholds = options.thresholds ?? {} 
  const reporters = options.reporters ?? []
  const overrides = {
    check: {
      global: { ...thresholds },
      each: { ...thresholds }
    }
  }

  const objConfig = config.loadObject(overrides)
  const reporter = createReporter(objConfig, resolve('coverage'))

  reporter.addAll([ 
    'text-summary', 
    'lcov',
    ...reporters
  ])

  reporter.write(coverageMap)

  const globalSummary = coverageMap.getCoverageSummary()
  await checkThreshold(objConfig.check.global, globalSummary)
}