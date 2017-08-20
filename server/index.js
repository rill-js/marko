'use strict'

var stream = require('stream')
var AsyncStream = require('marko/src/runtime/html/AsyncStream')
var componentGlobals = require('marko/src/components/taglib/component-globals-tag')
var initComponents = require('marko/src/components/taglib/init-components-tag')
var awaitReorderer = require('marko/src/taglibs/async/await-reorderer-tag')

class Readable extends stream.Readable {
  constructor (template, data, options) {
    super()
    this._t = template
    this._d = data
    this._shouldBuffer = !options || options.shouldBuffer !== false
    this._rendered = false
  }

  write (data) {
    if (data != null) {
      this.push(data)
    }
  }

  end () {
    this.push(null)
  }

  _read () {
    if (this._rendered) return
    else this._rendered = true

    var template = this._t
    var data = this._d
    var globalData = data && data.$global
    var shouldBuffer = this._shouldBuffer
    var out = new AsyncStream(globalData, this, null, shouldBuffer)
    template.render(data, out)
    componentGlobals(null, out)
    initComponents(null, out)
    awaitReorderer(null, out)
    out.end()
  }
}

/**
 * Creates a Rill middleware that renders a marko component.
 */
module.exports = function markoMiddlewareSetup (template) {
  return function markoMiddleware (ctx) {
    var req = ctx.req
    var res = ctx.res
    var locals = ctx.locals
    locals.$global = { req: req, locals: locals }
    if (res.status === 404) res.status = 200
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.body = new Readable(template, locals)
  }
}
