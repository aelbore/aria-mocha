import * as mockfs from 'mock-fs'
import { getSourceFiles } from './get-source-files'

describe('getSourceFiles', () => {

  afterEach(() => {
    mockfs.restore()
  })

  it('should get the sources files', async () => {
    mockfs({
      './src/fs': {
        'fs.spec.ts': '',
        'get-test-files.spec.ts': '',
        'get-test-files.ts': ''
      }
    })

    const files = await getSourceFiles('./src', true)
  })

  it('should not get the sources files', async () => {
    const result = await getSourceFiles('./src/cli', true)
  })

})