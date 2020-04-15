import * as sinon from 'sinon'

import { expect } from '../expect'
import { CoverageSummary } from '../libs'

import { checkThreshold } from './check-threshold'

describe('check-threshold', () => {
  let warnStub: sinon.SinonStub

  beforeEach(() => {
    warnStub = sinon.stub(console, 'warn').returns(void 0)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should check the threshold values with warning', async () => {
    const thresholds = {
      statements: 90,
      branches: 95,
      functions: 100,
      lines: 100
    }

    thresholds['emitWarning'] = true

    const summary = ({
      data: {
        statements: { pct: 85 },
        branches: { pct: 100 },
        lines: { pct: 100 },
        functions: { pct: 100 }
      },
      statements: { pct: 85 },
      branches: { pct: 100 },
      lines: { pct: 100 },
      functions: { pct: 100 }
    }) as CoverageSummary

   await checkThreshold(thresholds, summary)
   
   expect(warnStub.called).toBeTrue()
  })

  it('should check the threshold values without warning and error', async () => {
    const thresholds = {
      statements: 90,
      branches: 95,
      functions: 100,
      lines: 100
    }

    const totals = { pct: 100 }
    const summary = ({
      data: {
        statements: { ...totals },
        branches: { ...totals },
        lines: { ...totals },
        functions: { ...totals }
      }
    }) as CoverageSummary

    await checkThreshold(thresholds, summary)
   
    expect(warnStub.called).toBeFalse()
  })

})