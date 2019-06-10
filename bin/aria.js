#!/usr/bin/env node

const path = require('path')
const tsconfig = require(path.resolve('tsconfig.json'))

const tsconfigDefaults = {
  "target": "esNext",
  "module": "commonjs"
}

require('ts-node').register({
  typeCheck: false,
  compilerOptions: {
    ...tsconfig.compilerOptions,
    ...tsconfigDefaults
  }
})

require('./cli').test()