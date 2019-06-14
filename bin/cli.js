
export async function test() {
  const program = require('commander')
  const pkg = require('../package.json')

  /**
   * aria test demo \
   *  --mocha \
   *  --check-coverage \
   *  --include-dir demo \
   *  --threshold statements=50,functions=50,branches=50
   */
  program
    .version(pkg.version)
    .arguments('[command] [dir]')
    .option('-m, --mocha [mocha]')
    .option('-c, --check-coverage [checkCoverage]')
    .option('-i, --include-dir [include]')
    .option('-t, --threshold [thresholds]')
    .option('-r, --reporters [reporters]')
    .action(action)

    async function action(command, dir = 'src', options) {
      if (command) {
        await execute({ command, dir, options })
      }
    }

    async function execute({ command, dir, options }) {
      if (options) {
        dir = dir ? dir: 'src'

        const [ run, parseCoverageOptions ] = await Promise.all([
          import('aria-mocha').then(es => es.run),
          import('./options').then(es => es.parseCoverageOptions)
        ])
        
        const coverageOptions = parseCoverageOptions(options)
        await run(dir, { ...coverageOptions })
      }
    }
  
    program.parse(process.argv); 
}