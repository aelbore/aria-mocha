import mockfs from 'mock-fs'

import { expect } from '../expect'
import { getTestFiles } from './get-test-files'

describe('getTestFiles', () => {

  afterEach(() => {
    mockfs.restore()
  })

  it('should get the test files when file is typeof file', async () => {
    const spec = 'get-test-files.spec.ts'
    mockfs({
      './src/fs': {
        'get-test-files.spec.ts': ''
      }
    })

    const result = await getTestFiles('./src/fs/get-test-files.spec.ts', true)
    expect(result.length).equal(1)
    expect(result.pop()).equal(`./src/fs/${spec}`)
  })

  it('should get the test files when file is typeof folder', async () => {
    const spec = 'get-test-files.spec.ts'

    mockfs({
      './src/fs': {
        'get-test-files.spec.ts': '',
        'get-test-files.ts': ''
      }
    })

    const result = await getTestFiles('./src/fs', true)
    expect(result.length).equal(1)
    expect(result.pop()).equal(`./src/fs/${spec}`)
  })

  it('should get the test files when file is not typeof file or directory', async () => {
    mockfs({
      './src/fs': {
        'original-file.ts': '',
        'get-test-files.spec.ts': mockfs.symlink({
          path: './src/fs/original-file.ts'
        })
      }
    })

    const result = await getTestFiles('./src/fs/get-test-files.spec.ts', true)
  })

  it('should get the test files when file is pattern', async () => {
    mockfs({
      './src/fs': {
        'fs.spec.ts': '',
        'get-test-files.spec.ts': '',
        'get-test-files.ts': ''
      }
    })

    const result = await getTestFiles('./src/fs/*.spec.ts', true)
    expect(result.length).equal(2)
  })

})