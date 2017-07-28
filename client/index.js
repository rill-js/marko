'use strict'

var activeTemplate = null
var activeRender = null

/**
 * Creates a Rill middleware that renders a marko component.
 */
module.exports = function markoMiddlewareSetup (template) {
  return function markoMiddleware (ctx) {
    var req = ctx.req
    var res = ctx.res
    var locals = ctx.locals
    if (res.status === 404) res.status = 200
    locals.$global = { req: req, locals: locals }
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.body = ' '

    // Update a component if it has already been rendered.
    if (activeTemplate === template) return rerender(locals)

    // Otherwise create a new component.
    return template.render(locals).then(function (result) {
      result.replace(document.body.firstElementChild)
      activeTemplate = template
      activeRender = result
    })
  }
}

/**
 * Rerenders an existing RenderResult.
 * @param {*} input - The new input for the component.
 */
function rerender (input) {
  var component = activeRender.getComponent()
  component.input = input
  component.___global = input.$global
  component.forceUpdate()
  return new Promise(function (resolve) {
    component.once('update', resolve)
  })
}
