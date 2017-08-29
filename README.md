<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/marko
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

It is recommended to combine this middleware with [@rill/page](https://github.com/rill-js/page) as seen below to facilitate full page isomorphic rendering with [Marko](http://markojs.com).

# Installation

```console
npm install @rill/marko
```

# Example

```javascript
import Rill from 'rill'
import page from '@rill/page'
import render from '@rill/marko'

// Create a rill app.
const app = Rill()

// Setup the document template.
app.get(page
  .html({ lang: 'en' })
  .meta({ charset: 'utf8' })
  .title('My Marko App')
  .meta({ name: 'author', content: 'Dylan Piercey' })
  .meta({ name: 'descripton', content: 'Universal JS is awesome' })
  .link({ rel: 'stylesheet', href: 'index.css' })
  .script({ src: 'index.js', async: true })
)

// Set locals in middleware. (access in marko with out.global)
app.use(({ locals }), next)=> {
	locals.title = '@rill/marko'
	return next()
})

// Render a Marko template.
const HomeTemplate = require('./home.marko')
app.get('/home', render(HomeTemplate, {
  message: 'world'
}))
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
