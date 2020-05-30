import { resolve } from 'path'
import { expect } from '../expect'

import { prepareUrl } from './prepare-url'

describe('prepareUrl', () => {

  it('should [prepareUrl] have file Url', () => {
    const relativePath = './node_modules/.tmp/test/index.html'
    const url = prepareUrl(relativePath)

    const expected = `file://${resolve(relativePath)}`
    expect(url).equal(expected)
  })

  it('should [prepareUrl] have Url', () => {
    const expectedUrl = 'http://localhost:3000'
    const url = prepareUrl(expectedUrl)

    expect(url).equal(expectedUrl)
  })

})