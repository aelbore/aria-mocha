import * as path from 'path'
import { rollup, createTSRollupConfig, TSRollupConfig, mkdirp, writeFile } from 'aria-build'
import { OutputChunk } from 'rollup'

async function rollupGenerate({ inputOptions, outputOptions }) {
	const bundle = await rollup(inputOptions)
	const { output } = await bundle.generate(outputOptions)
	return output
}

async function buildOutput(options: TSRollupConfig) {
	return rollupGenerate(createTSRollupConfig(options))
}

function createHtmlMarkup(code: string) {
	return `
<html>
<head>
	<title>Page Title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	<div id="mocha"></div>
	<script src="../mocha/mocha.js"></script>
	<script src="../mocha-teamcity-reporter/lib/teamcityBrowser.js"></script>
	<script src="../chai/chai.js"></script>
	<script>mocha.setup('bdd');</script>	
	<script>${code}</script>
	<script>mocha.run();</script>
</body>
</html>	
	`
}

export interface TranspileOptions {
	dir?: string;
	outDir?: string;
	html?: string;
}

export async function transpile(files: string[]) {
	const inputs = files.map(specFile => specFile.replace(path.resolve(), '.'))

	const outputs = await buildOutput({
		input: inputs,
		external: [ 'chai' ],
		output: {
			format: 'iife',
			globals: {
				'chai': 'chai'
			}
		}
	})

	const codes = outputs.map(output => {
		const { code } = output as OutputChunk
		return code
	})

	return codes.map(code => code).join('\n')
}

export async function createHtmlFile(code: string) {
	const outDir = './node_modules/.tmp'
	mkdirp(outDir)
	await writeFile(path.join(outDir, 'index.html'), createHtmlMarkup(code)) 
}