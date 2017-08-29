'use strict'

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')

describe('Rill/Marko', function () {
  it('should work on the server', function () {
    var View = require('./build/server')
    var render = require('../server')
    var request = agent(
      Rill()
        .get('/', function (ctx, next) {
          ctx.locals.noun = 'world'
          return next()
        }, render(View))
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert.equal(
          res.text.split('<script>')[0],
          '<div>hello world</div>'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
  })

  it('should work in the client', function () {
    var View = require('./build/client')
    var render = require('../client')
    var request = agent(
      Rill()
        .get('/', function (ctx, next) {
          ctx.locals.noun = 'world'
          return next()
        }, render(View))
        .listen()
    )

    return request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert.equal(
          document.body.innerHTML,
          '<div>hello world</div>'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
  })
})
