import * as sinon from 'sinon'
import * as path from 'path';

import { expect } from '../expect'
import { setup } from './setup'

describe('setup', () => {
  let getSourceFiles: typeof import('../fs/fs')

  before(async () => {
    getSourceFiles = await import('../fs/fs')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should setup coverage', async () => {
  
    const getSourceFileSpy = sinon
      .stub(getSourceFiles, 'getSourceFiles')
      .returns(Promise.resolve([ path.resolve('./src/cov/setup.ts') ]))

    await setup('./src')

    expect(getSourceFileSpy.called).toBeTrue()
  })

})