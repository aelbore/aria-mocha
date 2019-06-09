import { run } from '../src/index'

const dir = 'examples', src = 'examples'

run(dir, {
  src,
  coverageOptions: {
    checkCoverage: true
  }
})