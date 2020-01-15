import { CommandLineOptions, TestCustomOptions } from './cli-options';
import { updateOptions, parseCoverageOptions } from './cli-utils';
import { cliRun, cliCustomRun } from './cli-run';

export async function handler(opts?: CommandLineOptions) {
  const options = updateOptions(opts);
  const coverageOptions = parseCoverageOptions(options)
  opts.browser
    ? await cliCustomRun(coverageOptions as TestCustomOptions)
    : await cliRun(coverageOptions)
}