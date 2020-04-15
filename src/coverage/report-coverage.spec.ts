import * as sinon from 'sinon'

import { expect } from '../expect'
import { CoverageMap } from '../libs'

import { reportCoverage } from './report-coverage'
import { ThresholdOptions } from './check-threshold'

describe('report-coverage', () => {  
  const coverageMap = { getCoverageSummary() {} } as CoverageMap

  let libs: typeof import('../libs')
  let checkThreshold: typeof import('./check-threshold')

  let checkThresholdStub: sinon.SinonStub
  let loadObjectStub: sinon.SinonStub
  let createReporterSpy: sinon.SinonStub
  let addAllSpy: sinon.SinonSpy
  let writeSpy: sinon.SinonSpy
  let coverageSummary: sinon.SinonSpy

  before(async () => {
    [ libs, checkThreshold ] = await Promise.all([
      import('../libs'), import('./check-threshold')
    ])
  })

  beforeEach(() => {
    const reportResult = { 
      addAll(string: string) {},
      write(coverageMap: CoverageMap) {}
    }

    const getInstanbul = {
      config: {
        loadObject(obj: any, overrides?: any) {
          return {}
        }
      },
      createReporter: (objConfig: any, reportPath: string) => reportResult
    }

    sinon
      .stub(libs, 'getInstanbul')
      .returns(Promise.resolve(getInstanbul))

    loadObjectStub = sinon
      .stub(getInstanbul.config, 'loadObject')
      .returns({ check: {}, global: {} })

    createReporterSpy = sinon
      .stub(getInstanbul, 'createReporter')
      .returns(reportResult)
      
    checkThresholdStub = sinon
      .stub(checkThreshold, 'checkThreshold')
      .returns(void 0)
   
    addAllSpy = sinon.spy(reportResult, 'addAll')
    writeSpy = sinon.spy(reportResult, 'write')
    coverageSummary = sinon.spy(coverageMap, 'getCoverageSummary')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should reportCoverage', async () => {

    await reportCoverage(coverageMap, {})

    expect(loadObjectStub.called).toBeTrue()
    expect(createReporterSpy.called).toBeTrue()
    expect(addAllSpy.called).toBeTrue()
    expect(writeSpy.called).toBeTrue()
    expect(coverageSummary.called).toBeTrue()
    expect(checkThresholdStub.called).toBeTrue()
  })

  it('should reportCoverage has thresholds,reporters', async () => {
    const thresholds: ThresholdOptions = {
      statements: 90,
      branches: 95,
      functions: 100,
      lines: 100
    }

    const reporters = [ 'lcov' ]
    
    await reportCoverage(coverageMap, { thresholds, reporters })
    
    expect(loadObjectStub.called).toBeTrue()
    expect(createReporterSpy.called).toBeTrue()
    expect(addAllSpy.called).toBeTrue()
    expect(writeSpy.called).toBeTrue()
    expect(coverageSummary.called).toBeTrue()
    expect(checkThresholdStub.called).toBeTrue()
  })

})
