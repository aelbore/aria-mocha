import * as sinon from 'sinon'

import { expect } from 'aria-mocha'
import { coverage } from './coverage'

describe('coverage', () => {
  let setup: typeof import('./setup')
  let report: typeof import('./report')

  before(async() => {
    [ setup, report ] = await Promise.all([
      import('./setup'),
      import('./report')
    ])
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should have coverage', async () => {
    const setupStub = sinon
      .stub(setup, 'setup')
      .returns(Promise.resolve(void 0))

    const reportStub = sinon
      .stub(report, 'report')
      .returns(Promise.resolve(void 0))

    const Coverage = await coverage('src', { checkCoverage: true })
    Coverage.report()

    expect(setupStub.called).toBeTrue()
    expect(reportStub.called).toBeTrue()
  })

  it('should not have coverage', async () => {
    const setupStub = sinon
      .stub(setup, 'setup')
      .returns(Promise.resolve(void 0))

    const reportStub = sinon
      .stub(report, 'report')
      .returns(Promise.resolve(void 0))

    const Coverage = await coverage('src', { checkCoverage: false })
    Coverage.report()

    expect(setupStub.called).toBeFalse()
    expect(reportStub.called).toBeFalse()
  })

  it('should not have coverage without options', async () => {
    const setupStub = sinon
      .stub(setup, 'setup')
      .returns(Promise.resolve(void 0))

    const reportStub = sinon
      .stub(report, 'report')
      .returns(Promise.resolve(void 0))

    const Coverage = await coverage('src')
    Coverage.report()

    expect(setupStub.called).toBeFalse()
    expect(reportStub.called).toBeFalse()
  })

})