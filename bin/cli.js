
async function test() {
  const program = require('commander')
  const pkg = require('../package.json')  
  const run = require('aria-mocha').run

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
    .action(action)

    function parseThresholds(options) {
      const thresholds = {}
      options.threshold.split(',').map(key => key.split('='))
        .forEach(threshold => {
          thresholds[threshold[0]] = parseInt(threshold[1])
        })
      return thresholds
    }

    function parseCoverageOptions(options) {
      const { threshold, includeDir, checkCoverage } = options

      const thresholds = (threshold && !(typeof threshold === 'boolean') 
        ? parseThresholds(options): {}) 

      return {
        src: includeDir,
        coverageOptions: {
          checkCoverage,
          thresholds
        }
      }
    }

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