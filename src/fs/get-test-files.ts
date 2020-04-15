import { promises } from 'fs'
import { join } from 'path'

import { globFiles } from '../libs'
import { isGlob } from './utils'

const patterns = () => [ 
  '**/*.spec.ts', 
  '**/*.spec.js', 
  '**/*.test.ts',  
  '**/*.test.js' 
]

async function getFiles(file: string, relative: boolean) {
  const stat = await promises.lstat(file)
  return stat.isDirectory() 
    ? await globFiles(patterns().map(pattern => join(file, pattern)), relative)
    : stat.isFile() ? [ file ]: []
}

export function getTestFiles(file: string, relative?: boolean) {
  return isGlob(file) ? globFiles(file, relative): getFiles(file, relative)
}