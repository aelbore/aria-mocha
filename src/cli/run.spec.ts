import * as sinon from 'sinon'

import { expect } from '../expect'
import { cliRun } from './run'

describe('cliRun', () => {
  let testFiles: typeof import('../fs/fs')
  let coverage: typeof import('../coverage')
  let libs: typeof import('../libs')

  function createMochaStub() {
    const createMocha = () => {
      const files: string[] = []
      const addFile = (file: string) => files.push(file)
      const run = () => null

      return { files, addFile, run }
    }
  
    const mocha = createMocha()
    const runStub = sinon
      .stub(mocha, 'run')
      .returns({ on: (event: string, listener: () => void) => listener() })

    sinon.stub(libs, 'Mocha').returns(mocha)

    return {
      mocha,
      runStub
    }
  }

  function createCoverageStub() {
    const createCoverage = () => ({ 
        report: () => Promise.resolve()
    })

    const coverageCoverage = createCoverage()
    const coverageStub = sinon
      .stub(coverage, 'coverage')
      .returns(Promise.resolve(coverageCoverage))

    const reportSpy = sinon.spy(coverageCoverage, 'report')

    return {
      coverageStub,
      reportSpy
    }  
  }

  before(async () => {
    [ testFiles, coverage, libs ] = await Promise.all([
      import('../fs/fs'), import('../coverage'), import('../libs')
    ])
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should execute mocha when files typeof directory', async () => {
    const getTestFilesSpy = sinon
      .stub(testFiles, 'getTestFiles')
      .returns(Promise.resolve([]))

    const coverageCoverage = createCoverageStub()
    const mocha = createMochaStub()

    const options = {
      files: 'src'
    }

    await cliRun(options)

    const { coverageStub, reportSpy } = coverageCoverage
    const { runStub } = mocha

    expect(getTestFilesSpy.called).toBeTrue()
    expect(runStub.called).toBeTrue()
    expect(coverageStub.called).toBeTrue()
    expect(reportSpy.called).toBeTrue()
  })

  it('should execute mocha when have array of files', async () => {
    const getTestFilesSpy = sinon.spy(testFiles, 'getTestFiles')
    const coverageCoverage = createCoverageStub()
    const mochaStub = createMochaStub()

    const options = {
      files: [
        './parse-thresholds.spec.ts',
        './update-options.spec.ts'
      ]
    }

    await cliRun(options)

    const { coverageStub, reportSpy } = coverageCoverage
    const { runStub, mocha } = mochaStub

    expect(getTestFilesSpy.called).toBeFalse()
    expect(mocha.files.length).equal(2)
    expect(runStub.called).toBeTrue()
    expect(coverageStub.called).toBeTrue()
    expect(reportSpy.called).toBeTrue()
  })

})