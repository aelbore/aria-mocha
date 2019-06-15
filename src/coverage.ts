import * as path from 'path'

import { CoverageMap, createCoverageMap, CoverageSummary, hookRequire, TransformerOptions, createInstrumenter, createReporter, config } from './libs';
import { getSourceFiles } from './files'

declare var global: any;

function logThresholdMessage(thresholds, message) {
  if (thresholds.emitWarning) {
    console.warn(message);
  } else {
    console.error(message);
  }
}

async function addFileCoverage(coverageMap: CoverageMap, coverageVar: any) {
  const coverageKeys = Object.keys(coverageVar)
  await Promise.all(coverageKeys.map(filename => {
    coverageMap.addFileCoverage(coverageVar[filename])
  }))
}

async function reportCoverage(coverageMap: CoverageMap, options: CoverageOptions) {
  const thresholds = options.thresholds ? options.thresholds: {} 
  const reporters = options.reporters ? options.reporters: []

  const overrides = {
    check: {
      global: { ...thresholds },
      each: { ...thresholds }
    }
  }

  const objConfig = config.loadObject(overrides)
  const reporter = createReporter(objConfig, path.resolve('coverage'))

  reporter.addAll([ 
    'text-summary', 
    'lcov',
    ...reporters
  ])

  reporter.write(coverageMap)

  const globalSummary = coverageMap.getCoverageSummary()
  await checkThreshold(objConfig.check.global, globalSummary)
}

async function report(options: CoverageOptions) {
  const coverageVar = global.__coverage__

  const coverageMap = createCoverageMap()
  await addFileCoverage(coverageMap, coverageVar)
  await reportCoverage(coverageMap, options)
}

async function setup(src: string) {
  const files = await getSourceFiles(src)
  const instrumenter = createInstrumenter()

  const transformer = (code: string, options: TransformerOptions) => {
    return instrumenter.instrumentSync(code, options.filename)
  }
  const hookMatcher = (file: string) => files.includes(file)
  hookRequire(hookMatcher, transformer, { 
    verbose: false, 
    extensions: [ '.js', '.ts' ] 
  })
}

export function checkThreshold(thresholds: ThresholdOptions, summary: CoverageSummary) {
  // @ts-ignore
  delete thresholds.excludes
    
  const failedTypes = Object.keys(thresholds).filter(key => {
    return summary.data[key].pct < thresholds[key]
  })

  return Promise.all(failedTypes.map(type => {
    logThresholdMessage(
      thresholds,
      `Coverage for ${type} (${
        summary[type].pct
      }%) does not meet global threshold (${thresholds[type]}%)`
    );
  }))
}

export interface ThresholdOptions {
  statements?: number,
  lines?: number,
  functions?: number,
  branches?: number,
}

export interface CoverageOptions {
  thresholds?: ThresholdOptions;
  reporters?: string[];
  checkCoverage?: boolean;
}

export async function coverage(src: string, options: CoverageOptions = {}) {
  if (options.checkCoverage) {
    await setup(src)
  }
  return {
    report() {
      return options.checkCoverage 
        ? report(options): Promise.resolve()
    }
  }
}