import { symlinkDir } from 'aria-build'

(async function() {

  await import('./build')
  await symlinkDir('./dist', './node_modules/aria-mocha')

})()