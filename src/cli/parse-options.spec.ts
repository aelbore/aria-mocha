import { expect } from '../expect'
import { parseOptions } from './parse-options'

describe('parseOptions', () => {

  it('should parse options when parameter is empty or null', () => {
    const options = parseOptions()

    const { checkCoverage, thresholds, reporters } = options.coverageOptions
    expect(checkCoverage).toBeFalse()
    expect(reporters.length).equal(0)
    expect(Object.keys(thresholds).length).equal(0)
  })

  it('should parse options when parameter is not empty or null', () => {
    const opts = {
      threshold: 'statements=50,branches=67',
      reporters: 'lcov',
      checkCoverage: true
    }
    
    const options = parseOptions(opts)
    
    expect(options.coverageOptions.checkCoverage).toBeTrue()
    expect(options.coverageOptions.reporters.length).equal(1)
    expect(options.coverageOptions.thresholds.statements).equal(50)
    expect(options.coverageOptions.thresholds.branches).equal(67)
  })

  it('should set `src` to options.includeDir', () => {
    const opts = {
      includeDir: 'src'
    }
    const options = parseOptions(opts)
    expect(options.src).equal(opts.includeDir)
  })

  it('should set `src` to options.dir', () => {
    const opts = {
      dir: 'src'
    }
    const options = parseOptions(opts)
    expect(options.src).equal(opts.dir)
  })
  
})
