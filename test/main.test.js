'use strict'
require('marko/compiler').configure({ writeToDisk: false })
require('marko/node-require').install()

var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var View = require('./view.marko')
var serverRender = require('../server')

describe('Rill/Marko', function () {
  it('should work on the server', function (done) {
    var request = agent(
      Rill()
        .get('/', function (ctx, next) {
          ctx.locals.hello = 'world'
          return next()
        }, serverRender(View))
        .listen()
    )

    request
      .get('/')
      .expect(200)
      .expect(function (res) {
        assert.equal(
          res.text,
          '<div>world 127.0.0.1</div>'
        )
      })
      .expect('content-type', 'text/html; charset=UTF-8')
      .end(done)
  })
})
