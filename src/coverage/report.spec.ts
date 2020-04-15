import * as sinon from 'sinon'

import { expect } from '../expect' 
import { report } from './report'
import { CoverageOptions } from './coverage'

describe('report', () => {
  let reportCoverage: typeof import('./report-coverage')
  let addFileCoverage: typeof import('./add-file-coverage')

  let reportCovStub: sinon.SinonStub
  let addFileCovStub: sinon.SinonStub

  before(async () => {
    [ reportCoverage, addFileCoverage ] = await Promise.all([
      import('./report-coverage'), import('./add-file-coverage')
    ])
  })

  beforeEach(() => {
    reportCovStub = sinon.stub(reportCoverage, 'reportCoverage')
    addFileCovStub = sinon.stub(addFileCoverage, 'addFileCoverage')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should report coverage without options', async () => {

    await report()

    expect(reportCovStub.called).toBeTrue()
    expect(addFileCovStub.called).toBeTrue()
  })

  it('should report coverage without options', async () => {
    const options: CoverageOptions = {
      checkCoverage: true
    }
    
    await report(options)

    expect(reportCovStub.called).toBeTrue()
    expect(addFileCovStub.called).toBeTrue()
  })

})