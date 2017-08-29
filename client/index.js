'use strict'

var marko = require('marko/components')
var activeTemplate = null
var root = document.body

/**
 * Creates a Rill middleware that renders a marko component.
 */
module.exports = function markoMiddlewareSetup (template) {
  return function markoMiddleware (ctx) {
    var res = ctx.res
    if (res.status === 404) res.status = 200
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.body = ' '

    // Skip initial render.
    if (!activeTemplate && marko.init) {
      marko.init()
      activeTemplate = template
      return
    }

    // Create component input. (makes locals out.global)
    var input = { $global: ctx.locals }

    // Update a component if it has already been rendered.
    if (activeTemplate === template) {
      var component = marko.getComponentForEl(root.firstChild)
      if (component) {
        component.input = input
        return
      }
    }

    // Otherwise create a new component.
    return template.render(input).then(function (result) {
      result.replaceChildrenOf(root)
      activeTemplate = template
    })
  }
}
