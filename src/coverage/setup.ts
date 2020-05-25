import { createInstrumenter, TransformerOptions, hookRequire } from '../libs'
import { getSourceFiles } from '../fs/fs'

/* istanbul ignore next */
export async function setup(src: string) {
  const files = await getSourceFiles(src)
  const instrumenter = createInstrumenter({ esModules: true, produceSourceMap: true })

  const transformer = (code: string, options: TransformerOptions) => {
    return instrumenter.instrumentSync(code, options.filename)
  }

  const hookMatcher = (file: string) => files.includes(file)
  hookRequire(hookMatcher, transformer, { 
    verbose: false, 
    extensions: [ '.js', '.ts' ] 
  })
}