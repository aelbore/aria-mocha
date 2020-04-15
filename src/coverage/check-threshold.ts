import { CoverageSummary } from '../libs';

export interface ThresholdOptions {
  statements?: number,
  lines?: number,
  functions?: number,
  branches?: number,
}

function logThresholdMessage(emitWarning: boolean, message: string) {
  emitWarning 
    && console.warn(message)
}

export async function checkThreshold(thresholds: ThresholdOptions, summary: CoverageSummary) {
  // @ts-ignore
  delete thresholds.excludes

  const keys = Object.keys(thresholds).filter(key => !key.includes('emitWarning'))
  const failedTypes = keys.filter(key => summary.data[key].pct < thresholds[key])

  await Promise.all(failedTypes.map(type => {
    logThresholdMessage(
      /// @ts-ignore
      thresholds.emitWarning,
      `Coverage for ${type} (${
        summary[type].pct
      }%) does not meet global threshold (${thresholds[type]}%)`
    )
  }))
}