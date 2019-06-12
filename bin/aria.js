#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const TS_CONFIG_PATH = path.resolve('tsconfig.jso')

const tsconfigDefaults = {
  "target": "esNext",
  "module": "commonjs"
}

const compilerOptions = (fs.existsSync(TS_CONFIG_PATH) 
  ? require(TS_CONFIG_PATH).compilerOptions:
  {}
)

require('ts-node').register({
  typeCheck: false,
  compilerOptions: {
    ...compilerOptions,
    ...tsconfigDefaults
  }
})

require('./cli').test()