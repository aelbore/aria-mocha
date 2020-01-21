import { CommandLineOptions } from './cli-options'
import { updateOptions, parseCoverageOptions } from './cli-utils'
import { cliRun } from './cli-run'
import { getTestFiles } from './files'

export async function handler(opts?: CommandLineOptions) { 
  const options = updateOptions(opts);
  const coverageOptions = parseCoverageOptions(options)
  !opts.browser 
    ? await cliRun(coverageOptions)
    : (async function() {
        const files = await getTestFiles(options.dir)
        const opts = {
          ...options,
          files
        }
        const browser = await import('aria-mocha-headless')
        await browser.runner(opts)
      })()
}