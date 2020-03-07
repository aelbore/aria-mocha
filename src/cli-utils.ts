import { CommandLineOptions, TestOptions } from './cli-options'
import { ThresholdOptions } from './coverage'

function parseThresholds(options?: CommandLineOptions) {
  const thresholds = {}
  options.threshold.split(',').map(key => key.split('='))
    .forEach(threshold => {
      thresholds[threshold[0]] = parseInt(threshold[1])
    })
  return thresholds
}

export function updateOptions(options?: CommandLineOptions) {
  return {
    ...options,
    checkCoverage: options['check-coverage'],
    includeDir: options['include-dir']
  }
}

export function parseCoverageOptions(options?: CommandLineOptions) {
  const { threshold, includeDir, checkCoverage, dir, config, resolve, target } = options

  const thresholds: ThresholdOptions = (threshold && !(typeof threshold === 'boolean'))
    ? parseThresholds(options): {}

  const reporters = (options.reporters && !(typeof options.reporters === 'boolean'))
    ? options.reporters.split(','): []

  const opts: TestOptions = {
    src: includeDir ?? dir,
    dir,
    coverageOptions: {
      checkCoverage,
      thresholds,
      reporters
    },
    config,
    resolve,
    target
  }

  return opts
}