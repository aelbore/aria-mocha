import { CoverageMap } from '../libs'

export async function addFileCoverage(coverageMap: CoverageMap, coverageVar?: any) {
  const coverageKeys = Object.keys(coverageVar ?? {})
  await Promise.all(coverageKeys.map(filename => {
    coverageMap.addFileCoverage(coverageVar[filename])
  }))
}