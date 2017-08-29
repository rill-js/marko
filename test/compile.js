const fs = require('fs')
const path = require('path')
const compiler = require('marko/compiler')
const filename = path.join(__dirname, 'templates/view.marko')

try { fs.mkdirSync(path.join(__dirname, 'build')) } catch (_) {}

// Server build.
fs.writeFileSync(
  path.join(__dirname, 'build/server.js'),
  compiler.compileFile(filename)
)

// Client build.
fs.writeFileSync(
  path.join(__dirname, 'build/client.js'),
  compiler.compileFileForBrowser(filename).code
)
