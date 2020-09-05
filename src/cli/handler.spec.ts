import * as sinon from 'sinon'
import mock from 'mock-require'

import { expect } from '../expect'
import { CommandLineOptions } from './options'
import { handler } from './handler'

describe('handler', () => {
  let parseOptions: typeof import('./parse-options')
  let updateOptions: typeof import('./update-options') 
  let run: typeof import('./run')

  before(async () => {
    [ parseOptions, updateOptions, run ] = await Promise.all([  
      import('./parse-options'), import('./update-options'), import('./run')
    ])
  })

  afterEach(() => {
    sinon.restore()
    mock.stopAll()
  })

  it('should execute cliRun (nodejs test)', async() => {
    const opts = {
      _: [],
      'check-coverage': true,
      'include-dir': 'src',
      file: './tmp/cli/update-options.spec.ts',
      includeDir: 'src',
      checkCoverage: undefined,
      files: [],
      browser: false,
      target: undefined
    }

    const headless = {
      handler(opts?: CommandLineOptions) {}
    }

    /// spy vs stub
    /// Spy is to create a replicate of the function or object,
    ///   but still execute the function or object
    ///   so that you can test if the function is called or not
    /// Stub is to create a replicated of the function or object
    ///   but needs to have a return value
    
    const optionsSpy = sinon.spy(updateOptions, 'updateOptions')
    const coverageOptionsStub = sinon.stub(parseOptions, 'parseOptions').returns(null)
    const cliRunStub = sinon.stub(run, 'cliRun').returns(Promise.resolve())

    const browserHandlerStub = sinon.stub(headless, 'handler')
    mock('aria-mocha-headless', headless)

    await handler(opts)

    expect(optionsSpy.called).toBeTrue()
    expect(coverageOptionsStub.called).toBeTrue()
    expect(cliRunStub.called).toBeTrue()
    expect(browserHandlerStub.called).toBeFalse()
  })

})