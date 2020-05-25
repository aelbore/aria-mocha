import { resolve } from 'path'

export function prepareUrl(filePath: string) {
	if (/^[a-zA-Z]+:\/\//.test(filePath)) {
		return filePath
	}
	const resolvedPath = resolve(filePath)
	return `file://${resolvedPath}`
}