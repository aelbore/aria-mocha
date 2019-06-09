import { expect } from 'chai'
import { Calculator } from './calculator'

describe('Calculator', () => {

  it('should have add function', () => {
    expect(Calculator.add).to.be.ok;
  })

  it('add 2 numbers', () => {
    const total = Calculator.add(1, 1);
    expect(total).to.equal(2);
  })

  it('subtract 2 numbers', () => {
    const total = Calculator.subtract(2, 1)
    expect(total).to.equal(1)
  })

})