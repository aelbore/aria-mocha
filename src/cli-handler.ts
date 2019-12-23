import { CommandLineOptions } from './cli-options'
import { updateOptions, parseCoverageOptions } from './cli-utils'
import { cliRun } from './cli-run'

export async function handler(opts?: CommandLineOptions) { 
  const options = updateOptions(opts);
  const coverageOptions = parseCoverageOptions(options)
  !opts.browser 
    ? await cliRun(coverageOptions)
    : (async function() {
        const browser = await import('aria-mocha-headless')
        await browser.handler(opts)
      })()
}