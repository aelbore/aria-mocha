import { globFiles } from './libs';

export async function getTestFiles(dir: string) {
  const patterns = [ 
    '**/*.spec.ts', 
    '**/*.spec.js',
    '**/*.test.ts', 
    '**/*.test.js'
  ]
  const files = await globFiles(patterns.map(pattern => {
    return `${dir}/${pattern}`
  }))
  return files.filter(file => file)
}

export async function getSourceFiles(dir: string) {
  const validateExtension = (file: string) => {
    return !file.includes('.spec') && !file.includes('.test')
  }
  const patterns = [ 
    `${dir}/**/*.ts`, 
    `${dir}/**/*.js` 
  ]
  const files = await globFiles(patterns)
  return files.filter(file => file && validateExtension(file))
}