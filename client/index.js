'use strict'

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

    return template(locals).then(function (result) {
      result.replace(document.body.firstElementChild)
    })
  }
}
