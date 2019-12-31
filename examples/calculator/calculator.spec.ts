import { expect } from '../../src/expect'
import { Calculator } from './calculator'

describe('Calculator', () => {

  it('should have add function', () => {
    expect(Calculator.add).toBeDefined()
  })

  it('add 2 numbers', () => {
    const total = Calculator.add(1, 1);
    expect(total).equal(2)
  })

  it('subtract 2 numbers', () => {
    const total = Calculator.subtract(2, 1)
    expect(total).equal(1)
  })

})