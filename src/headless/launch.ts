/* istanbul ignore file */

import { initMocha, handleConsole } from './init-mocha'
import { prepareUrl } from './prepare-url'

export interface Stats {
	tests: number
	passes: number
	pending: number
	failures: number,
	start: string
	end: string,
	duration: number
}

export interface TestError {
	message: string
	showDiff: boolean
	actual: any,
	expected: any
	stack: string
}

export interface Test {
	title: string
	fullTitle: string
	duration: number
	err: TestError
}

export interface Result {
	stats: Stats
	tests: Test[]
	pending: Test[]
	failures: Test[]
}

export interface TestResult {
	result: Result,
	coverage: any | undefined
}

export async function launch(url: string, options?: import('puppeteer').LaunchOptions) {
	const puppeteer = require('puppeteer')
	const browser = await puppeteer.launch({ headless: true, ...(options ?? {}) })
	const result: TestResult = await browser.pages()
		.then(pages => pages.pop())            
		.then(async page => {
			page.on('console', handleConsole);
			page.on('dialog', dialog => dialog.dismiss());
			page.on('pageerror', err => console.error(err));

			const result = await page.evaluateOnNewDocument(initMocha, undefined)
					.then(() => page.goto(prepareUrl(url)))
						/// @ts-ignore
					.then(() => page.waitForFunction(() => window.__mochaResult__, { timeout: 60000 }))
					/// @ts-ignore
					.then(() => page.evaluate(() => window.__mochaResult__))

			browser.close()
			return result
    })

  return result
}