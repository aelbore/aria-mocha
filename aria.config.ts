import { copy, symlinkDir } from './node_modules/aria-build/aria-build';

function link() {
  return {
    name: 'link',
    'buildEnd': () => symlinkDir('./dist', './node_modules/aria-mocha')
  }
}

export default {
  plugins: {
    after: [
      copy({
        targets: [
          { src: 'bin/*', dest: 'dist/bin' } 
        ]
      }),
      link()
    ]
  }
}