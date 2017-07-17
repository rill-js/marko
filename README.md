<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/marko [WIP]
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/marko">
    <img src="https://img.shields.io/npm/v/@rill/marko.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/marko">
    <img src="https://img.shields.io/npm/dm/@rill/marko.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Universal [Marko](http://markojs.com) rendering middleware for [Rill](https://github.com/rill-js/rill).

# Installation

```console
npm install @rill/marko
```

# Example

```javascript
const app = require('rill')()
const page = require('@rill/page')
const render = require('@rill/marko')

// Setup the document template.
app.get(page
  .meta({ charset: 'utf8' })
  .title('My Marko App')
  .meta({ name: 'author', content: 'Dylan Piercey' })
  .meta({ name: 'descripton', content: 'Universal JS is awesome' })
  .link({ rel: 'stylesheet', href: 'index.css' })
  .script({ src: 'index.js', async: true })
)

// Set locals in middleware.
app.use(({ locals }), next)=> {
	locals.title = '@rill/marko'
	return next()
})

// Render a Marko template.
const HomeTemplate = require('./home.marko')
app.get('/home', render(HomeTemplate))
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
