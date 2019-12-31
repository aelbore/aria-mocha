import * as mockfs from 'mock-fs'
import * as assert from 'assert'

import { getSourceFiles, getTestFiles } from './files'

describe('files', () => {
  
  beforeEach(() => {
    mockfs({
      'src/aaa.ts': '',
      'src/aaa.spec.ts': ''
    })
  })

  afterEach(() => {
    mockfs.restore()
  })

  it('should [getSourceFiles].', async () => {
    const files = await getSourceFiles('src')

    assert.ok(Array.isArray(files))
  })

  it('should [getTestFiles]', async () => {
    const files = await getTestFiles('src')

    assert.ok(Array.isArray(files))
  })

})