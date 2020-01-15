import { getTestFiles } from './files'
import { Mocha, puppeteer } from './libs'
import { coverage } from './coverage'
import { TestOptions, TestCustomOptions } from './cli-options'
import { transpile, createHtmlFile } from './transpile'
import { prepareUrl, handleConsole } from './puppeteer-utils'
import { initMocha } from './puppeteer-init-mocha'

const mocha = new Mocha()

export async function cliRun(options?: TestOptions) {
  const { dir, src, coverageOptions } = options

  const files = await getTestFiles(dir)
  const codeCoverage = await coverage(src, coverageOptions)

  await Promise.all(files.map(file => {
    mocha.addFile(file)
  }))
  
  mocha.run() 
    .on('end', () => codeCoverage.report())
}

export async function cliCustomRun(options?: TestCustomOptions) {
  const { dir, files } = options

  const specFiles = files ?? await getTestFiles(dir)
  const code = await transpile(specFiles)
  await createHtmlFile(code)

  const url = prepareUrl('./node_modules/.tmp/index.html')

  try {
    const browser = await puppeteer.launch({ headless: true })
    await browser.pages()
      .then(pages => pages.pop())            
      .then(async page => {
        page.on('console', handleConsole);
        page.on('dialog', dialog => dialog.dismiss());
        page.on('pageerror', err => console.error(err));
  
        const result = await page.evaluateOnNewDocument(initMocha, undefined)
            .then(() => page.goto(url))
              /// @ts-ignore
            .then(() => page.waitForFunction(() => window.__mochaResult__, { timeout: 60000 }))
            /// @ts-ignore
            .then(() => page.evaluate(() => window.__mochaResult__))
  
        browser.close()
        return result
      })
  } catch (error) {
    console.error(error);
  }
}