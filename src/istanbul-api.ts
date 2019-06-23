import * as Istanbul from 'istanbul-api'

export interface ConfigOptions {
  loadObject: (obj: any, overrides?: any) => any
}

const config: ConfigOptions = {
  loadObject: Istanbul.config.loadObject
}

const createReporter = (cfg: any, opts: any) => {
  return Istanbul.createReporter(cfg, opts)
}

export {
  config,
  createReporter
}