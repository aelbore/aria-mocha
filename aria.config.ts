
import { copy, replaceContent } from 'aria-build'

function replace(filename: string) {
  return replaceContent({ filename, strToFind: '../src',  strToReplace: '../aria-mocha' })
}

export default {
  plugins: [
    copy({
      targets: [
        /// globFiles should support file 
        /// as source
        { src: './bin/*', dest: './dist/bin', replace } 
      ]
    })
  ]
}