import * as sinon from 'sinon'
import { FileCoverage, FileCoverageData, CoverageMap  } from 'istanbul-lib-coverage'

import { expect } from '../expect'
import { addFileCoverage } from './add-file-coverage'

describe('addFileCoverage', () => {
  let coverageMap: typeof import('../libs')
  let coverageMapMock: CoverageMap
  let coverageVar: any

  before(async() => {
    coverageMap = await import('../libs')

    coverageMapMock = ({
      addFileCoverage(pathOrObject: string | FileCoverage | FileCoverageData) {}
    }) as CoverageMap 

    coverageVar = {
      './add-file-coverage.ts': {
        path: './add-file-coverage.ts'
      }
    }
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should addFileCoverage', async () => {
    sinon.stub(coverageMap, 'CoverageMap').returns(coverageMapMock)

    const addFileStub = sinon.spy(coverageMapMock, 'addFileCoverage')
    await addFileCoverage(coverageMapMock as CoverageMap, coverageVar)

    expect(addFileStub.called).toBeTrue()
  })

  it('should not add coverageVar when it is null or empty', async () => {
    sinon.stub(coverageMap, 'CoverageMap').returns(coverageMapMock)

    const addFileStub = sinon.spy(coverageMapMock, 'addFileCoverage')
    await addFileCoverage(coverageMapMock as CoverageMap)

    expect(addFileStub.called).toBeFalse()
  })

})