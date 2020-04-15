import { updateOptions } from './update-options'
import { parseOptions } from './parse-options'

import { CommandLineOptions } from './options'
import { cliRun } from './run'

async function browserHandler(opts?: CommandLineOptions) {
  const browser = await import('aria-mocha-headless')
  await browser.handler(opts)
}

export async function handler(opts?: CommandLineOptions) { 
  const options = updateOptions(opts)
  const coverageOptions = parseOptions(options)

  options.browser || options.target
    ? await browserHandler(options)
    : await cliRun(coverageOptions)
}