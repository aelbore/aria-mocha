import { expect } from '../expect'
import { parseThresholds } from './parse-thresholds'

describe('parseThresholds', () => {

  it('should parse the thresholds parameter is empty or null', async () => {
    const threshold = parseThresholds()
    expect(Object.keys(threshold).length).equal(0)
  })

  it('should parse the thresholds with parameters', async () => {
    const expected = { 'statements': 50, 'branches': 67 }

    const threshold = parseThresholds('statements=50,branches=67')
    const keys = Object.keys(threshold)
    
    expect(keys.length).equal(2)
    await Promise.all(keys.map(key => {
      expect(threshold[key]).equal(expected[key])
    }))
  })

})
