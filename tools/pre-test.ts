import { copyFiles, clean } from 'aria-build'

(async function() {
  await Promise.all([ clean('tmp'), clean('coverage') ])
  await copyFiles('./src/**/*.ts', 'tmp')
})()