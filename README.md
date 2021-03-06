aredis
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/a-labo/aredis
[bd_travis_url]: http://travis-ci.org/a-labo/aredis
[bd_travis_shield_url]: http://img.shields.io/travis/a-labo/aredis.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/a-labo/aredis
[bd_travis_com_shield_url]: https://api.travis-ci.com/a-labo/aredis.svg?token=
[bd_license_url]: https://github.com/a-labo/aredis/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/a-labo/aredis
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/a-labo/aredis.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/a-labo/aredis.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/a-labo/aredis
[bd_gemnasium_shield_url]: https://gemnasium.com/a-labo/aredis.svg
[bd_npm_url]: http://www.npmjs.org/package/aredis
[bd_npm_shield_url]: http://img.shields.io/npm/v/aredis.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Redis wrapper

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install aredis --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const aredis = require('aredis')
const co = require('co')

let redis = aredis({
    host: '127.0.0.1',
    db: 1 // db number of redis
  })

;(async () => {
  // Set and get string
  {
    await redis.set('foo', 'bar')
    let foo = await redis.get('foo')
    console.log(foo) // -> 'bar'
  }

  // Set and get hash
  {
    await aredis.hset('baz', 'quz', 'quzz')
    let baz = await aredis.hgetall('baz')
    console.log(baz) // -> {quz: 'quzz'}
  }
})()
```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/a-labo/aredis/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------



<!-- Links End -->
