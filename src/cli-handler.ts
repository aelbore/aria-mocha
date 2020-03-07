import { CommandLineOptions } from './cli-options'
import { updateOptions, parseCoverageOptions } from './cli-utils'
import { cliRun } from './cli-run'

async function browserHandler(opts?: CommandLineOptions) {
  const browser = await import('aria-mocha-headless')
  await browser.handler(opts)
}

export async function handler(opts?: CommandLineOptions) { 
  const options = updateOptions(opts);
  const coverageOptions = parseCoverageOptions(options);
  (opts.browser || opts.target) 
      ? await browserHandler(opts)
      : await cliRun(coverageOptions)
}