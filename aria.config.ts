
import { copy, linkToPackages, replaceContent } from './node_modules/aria-build/aria-build';

function replace(filename: string) {
  return replaceContent({ filename, strToFind: '../src',  strToReplace: '../aria-mocha' })
}

export default {
  plugins: [
    copy({
      targets: [
        { src: 'bin/aria-mocha.js', dest: 'dist/bin', replace } 
      ]
    }),
    linkToPackages({ 
      moduleDir: 'aria-mocha',
      targets: [
        { package: 'aria-fs' }
      ]
    })
  ]
}