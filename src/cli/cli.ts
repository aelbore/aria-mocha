
/* istanbul ignore file */
export * from './options'
import { parseOptions as parseCoverageOptions } from './parse-options' 

export { parseCoverageOptions }
export { updateOptions } from './update-options'
export { parseThresholds } from './parse-thresholds'
export { parseOptions } from './parse-options'
export { handler } from './handler'
export { cliRun } from './run'