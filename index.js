import * as esbuild from 'esbuild'

export default async function importTSmodule (path, options = {}) {
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
