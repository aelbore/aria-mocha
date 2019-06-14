function parseThresholds(options) {
  const thresholds = {}
  options.threshold.split(',').map(key => key.split('='))
    .forEach(threshold => {
      thresholds[threshold[0]] = parseInt(threshold[1])
    })
  return thresholds
}

export function parseCoverageOptions(options) {
  const { threshold, includeDir, checkCoverage } = options

  const thresholds = (threshold && !(typeof threshold === 'boolean'))
    ? parseThresholds(options): {}

  const reporters = (options.reporters && !(typeof options.reporters === 'boolean'))
    ? options.reporters.split(','): []

  return {
    src: includeDir,
    coverageOptions: {
      checkCoverage,
      thresholds,
      reporters
    }
  }
}