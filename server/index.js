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
    var res = ctx.res
    var locals = ctx.locals
    locals.serializedGlobals = mapValuesTrue(locals)
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.body = new Readable(template, { $global: locals })
  }
}

/**
 * Converts an object to one where all values are truthy.
 *
 * @param {object} obj - the object to convert.
 * @param {object} result - an object with all true values.
 */
function mapValuesTrue (obj) {
  var result = {}
  for (var key in obj) result[key] = true
  return result
}
