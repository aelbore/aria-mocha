import { CommandLineOptions, TestOptions } from './options'
import { parseThresholds } from './parse-thresholds'

export function parseOptions(options?: CommandLineOptions) { 
  const thresholds = parseThresholds(options?.threshold)
  const reporters = options?.reporters ? options.reporters.split(','): [] 
  const checkCoverage = options?.checkCoverage ?? false
  const src = options?.includeDir ?? options?.dir ?? options?.file 

  const opts = {
    ...(options ?? {}),
    src,
    coverageOptions: {
      thresholds,
      reporters,
      checkCoverage
    }
  }

  delete opts.reporters
  delete opts.threshold
  delete opts.checkCoverage

  const result: TestOptions = { 
    ...opts 
  }

  return result
}