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