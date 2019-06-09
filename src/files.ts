import * as path from 'path'
import { globFiles } from 'aria-fs';

export async function getTestFiles(dir: string) {
  const patterns = [ 
    path.join(dir, '**/*.spec.ts'), 
    path.join(dir, '**/*.spec.js'),
    path.join(dir, '**/*.test.ts'), 
    path.join(dir, '**/*.test.js') 
  ]
  const files = await globFiles(patterns)
  return files.filter(file => file)
}

export async function getSourceFiles(dir: string) {
  const validateExtension = (file: string) => {
    return !file.includes('.spec') && !file.includes('.test')
  }
  const patterns = [ 
    path.join(dir, '**/*.ts'), 
    path.join(dir, '**/*.js')
  ]
  const files = await globFiles(patterns)
  return files.filter(file => file && validateExtension(file))
}