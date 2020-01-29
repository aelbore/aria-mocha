import { globFiles } from './libs';

export async function getTestFiles(dir: string, relative?: boolean) {
  const patterns = [ 
    '**/*.spec.ts', 
    '**/*.spec.js',
    '**/*.test.ts', 
    '**/*.test.js'
  ]
  const files = await globFiles(patterns.map(pattern => {
    return `${dir}/${pattern}`
  }), relative)
  return files.filter(file => file)
}

export async function getSourceFiles(dir: string, relative?: boolean) {
  const validateExtension = (file: string) => {
    return !file.includes('.spec') && !file.includes('.test')
  }
  const patterns = [ 
    `${dir}/**/*.ts`, 
    `${dir}/**/*.js` 
  ]
  const files = await globFiles(patterns, relative)
  return files.filter(file => file && validateExtension(file))
}