import * as mockfs from 'mock-fs'
import * as fs from 'fs';

import { expect } from './expect'
import { transpile, createHtmlFile } from './transpile'
import { getTestFiles } from './files'

describe('Transpile', () => {

  afterEach(() => {
    mockfs.restore()
  })

  it('should create and transpile.', async () => {
    const outDir = './node_modules/.tmp'

    mockfs({
      'src': {
        'hello-world.spec.ts': `
          describe('Transpile', () => {             
          })
        `
      },
      'node_modules/.tmp': {}
    })

    const files = await getTestFiles('src')

    const code = await transpile(files)
    await createHtmlFile(code)

    const isExist = fs.existsSync(`${outDir}/index.html`)
    expect(isExist).toBeTrue()
  })

})