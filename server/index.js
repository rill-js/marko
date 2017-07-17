'use strict'

/**
 * Creates a Rill middleware that renders a marko component.
 */
module.exports = function markoMiddlewareSetup (template) {
  return function markoMiddleware (ctx, next) {
    var req = ctx.req
    var res = ctx.res
    var locals = ctx.locals
    locals.$global = { req: req, locals: locals }
    if (res.status === 404) res.status = 200
    res.set('Content-Type', 'text/html; charset=UTF-8')
    res.body = template.stream(locals)
  }
}
