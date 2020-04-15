import { globFiles } from '../libs'

function getPatterns(dir: string) {
  return [  `${dir}/**/*.ts`,  `${dir}/**/*.js` ]
}

function validateExtension(file: string) {
  return !file.includes('.spec') && !file.includes('.test')
}

export async function getSourceFiles(dir: string, relative?: boolean) {
  const files = await globFiles(getPatterns(dir), relative)
  return files.filter(file => file && validateExtension(file))
}