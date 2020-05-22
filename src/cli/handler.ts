import { updateOptions } from './update-options'
import { parseOptions } from './parse-options'

import { CommandLineOptions } from './options'
import { cliRun } from './run'

export async function handler(opts?: CommandLineOptions) { 
  const options = updateOptions(opts)
  const coverageOptions = parseOptions(options)
  await cliRun(coverageOptions)
}