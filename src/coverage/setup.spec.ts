import * as sinon from 'sinon'
import * as path from 'path';

import { expect } from '../expect'
import { setup } from './setup'

describe('setup', () => {
  let getSourceFiles: typeof import('../fs/fs')
  let libs: typeof import('../libs')

  let instrumenterStub: sinon.SinonStub

  before(async () => {
    [ getSourceFiles, libs ] = await Promise.all([
      import('../fs/fs'), import('../libs')
    ])
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should setup coverage', async () => {
    const instrumenter = libs.createInstrumenter()
  
    const getSourceFileSpy = sinon
      .stub(getSourceFiles, 'getSourceFiles')
      .returns(Promise.resolve([ path.resolve('./src/cov/setup.ts') ]))

    instrumenterStub = sinon
      .stub(libs, 'createInstrumenter')
      .returns(instrumenter)

    await setup('./src')

    expect(getSourceFileSpy.called).toBeTrue()
    expect(instrumenterStub.called).toBeTrue()
    ///expect(instrumentSyncSpy.called).toBeTrue()
  })

})