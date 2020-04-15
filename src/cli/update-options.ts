import { lstatSync } from 'fs'

import { isGlob } from '../fs/fs'
import { CommandLineOptions, DEFAULT_OPTIONS } from './options'

function getFiles(file: string, _: string[]) {
  const fStat = lstatSync(file)
  return fStat.isDirectory() ? file: [ ..._, (fStat.isFile() && file) ]
}

export function updateOptions(options?: CommandLineOptions) {
  const { TEST_DIRECTORY, CHECK_COVERAGE } = DEFAULT_OPTIONS

  const file = options?.file ?? options?.dir ?? TEST_DIRECTORY
  const _ = options?._ ?? []

  const files = isGlob(file) ? file: getFiles(file, _)
  const checkCoverage = options?.['check-coverage'] ?? CHECK_COVERAGE
  const includeDir = options?.['include-dir'] ?? undefined

  const opts = {
    ...(options ?? {}),
    includeDir,
    checkCoverage,
    file,
    files
  }

  return opts
}