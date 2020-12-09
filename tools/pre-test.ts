import { copyFiles, clean } from 'aria-fs'

(async function() {
  await Promise.all([ clean('tmp'), clean('coverage') ])
  await copyFiles('./src/**/*.ts', 'tmp')
})()