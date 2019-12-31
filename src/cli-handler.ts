import { CommandLineOptions } from './cli-options';
import { updateOptions, parseCoverageOptions } from './cli-utils';
import { cliRun } from './cli-run';

export async function handler(opts?: CommandLineOptions) {
  const options = updateOptions(opts);
  const coverageOptions = parseCoverageOptions(options)
  await cliRun(coverageOptions)
}