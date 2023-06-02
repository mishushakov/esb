// @ts-check
const esbuild = require('esbuild')
const requireFromString = require('require-from-string')

async function importTSmodule (path, options = {}) {
  const result = await esbuild.build({
    entryPoints: [path],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    tsconfig: options.tsconfig
  })

  const code = result.outputFiles[0].text
  return import('data:application/javascript;base64,' + btoa(code))
}

function importTSmoduleSync (path, options = {}) {
  const result = esbuild.buildSync({
    entryPoints: [path],
    bundle: true,
    write: false,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    tsconfig: options.tsconfig
  })

  const code = result.outputFiles[0].text
  return requireFromString(code)
}

module.exports = {
  importTSmodule,
  importTSmoduleSync
}
