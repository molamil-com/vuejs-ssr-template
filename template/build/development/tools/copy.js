import path from 'path'
import gaze from 'gaze'
import replace from 'replace'
import Promise from 'bluebird'

async function copy({ watch } = {}) {
	const ncp = Promise.promisify(require('ncp'))

	await Promise.all([
        ncp('src/public', 'dist/public'),
		ncp('src/server/views', 'dist/views'),
        ncp('package.json', 'dist/package.json'),
    ])

	replace({
		regex: '"start-ssr".*',
		replacement: '"start-ssr": "node server.js"',
		paths: ['dist/package.json'],
		recursive: false,
		silent: false,
	})

	if(watch) {
		const watcher = await new Promise((resolve, reject) => {
			gaze('src/public/**/*.*', (err, val) => err ? reject(err) : resolve(val))
		})
		watcher.on('changed', async(file) => {
			const relPath = file.substr(path.join(__dirname, '../src/public/').length)
			await ncp(`src/public/${relPath}`, `build/public/${relPath}`);
		})
	}
}

export default copy
