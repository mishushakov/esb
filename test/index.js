import importTSmodule from './../index.js'

const module = await importTSmodule(new URL('./test.ts', import.meta.url).pathname)
console.log(module)
