import * as mockfs from 'mock-fs'

import { expect } from '../expect'
import { updateOptions } from './update-options'

describe('updateOptions', () => {

  afterEach(() => {
    mockfs.restore()
  })

  it('should update the options when parameter is empty or null', () => {
    const expected = { 
      checkCoverage: false, 
      includeDir: undefined, 
      file: 'src' 
    }

    mockfs({
      './src': {}
    })

    const options = updateOptions()

    expect(options.file).equal(expected.file)
    expect(options.files).equal(expected.file)
    expect(options.checkCoverage).equal(expected.checkCoverage)
    expect(options.includeDir).equal(expected.includeDir)
  })

  it('should update the options when --file ./tmp/cli/update-options.spec.ts', () => {
    const opts = {
      _: [],
      'check-coverage': true,
      'include-dir': 'src',
      file: './tmp/cli/update-options.spec.ts'
    }

    mockfs({
      './tmp/cli/update-options.spec.ts': ''
    })

    const options = updateOptions(opts)

    expect(Array.isArray(options.files)).toBeTrue()
    expect(options.checkCoverage).toBeTrue()
    expect(options.files.length).equal(1)
  })

  it('should update the options when --file ./tmp/cli/*.spec.ts', () => {
    const opts = {
      _: [
        './tmp/cli/parse-thresholds.spec.ts',
        './tmp/cli/update-options.spec.ts'
      ],
      file: './tmp/cli/parse-options.spec.ts'
    }

    const options = updateOptions(opts)

    expect(options.files.length).equal(3)
  })

  it('should update the options when --file ./tmp/cli/**/*.spec.ts', () => {
    const opts = {
      _: [],
      file: './tmp/cli/**/*.spec.ts'
    }

    const options = updateOptions(opts)
  })

  it('should update the options when --file ./tmp/**/*.spec.ts', () => {
    const opts = {
      _: [
        './tmp/cli/parse-thresholds.spec.ts',
        './tmp/cli/update-options.spec.ts',
        './tmp/fs/get-source-files.spec.ts',
        './tmp/fs/get-test-files.spec.ts'
      ],
      file: './tmp/cli/parse-options.spec.ts'
    }

    mockfs({
      './tmp/cli/parse-options.spec.ts': ''
    })

    const options = updateOptions(opts)

    expect(options.files.length).equal(5)
  })

  it('should update the options when has --dir', () => {
    const opts = {
      _: [],
      dir: './tmp'
    }

    mockfs({
      './tmp': {}
    })

    const options = updateOptions(opts)

    expect(options.files).equal(opts.dir)
  })

})