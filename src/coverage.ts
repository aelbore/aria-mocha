import { setup } from './coverage-setup'
import { report } from './report'
import { CoverageOptions } from './common'

export async function coverage(src: string, options: CoverageOptions) {
  if (options?.checkCoverage) {
    await setup(src)
  }
  return {
    report() {
      return options?.checkCoverage 
        ? report(options): Promise.resolve()
    }
  }
}