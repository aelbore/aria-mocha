
async function test() {
  const program = require('commander')
  const pkg = require('../package.json')

  const { run } = require('aria-mocha')
  const { parseCoverageOptions } = require('./options')

  /**
   * aria test demo \
   *  --mocha \
   *  --check-coverage \
   *  --include-dir demo \
   *  --reporters lcov,html,text-summary
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

        const coverageOptions = parseCoverageOptions(options)
        await run(dir, { ...coverageOptions })
      }
    }
  
    program.parse(process.argv); 
}

exports.test = test