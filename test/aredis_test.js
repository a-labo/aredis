/**
 * Test case for aredis.
 * Runs with mocha.
 */
'use strict'

const Aredis = require('../lib/aredis.js')
const assert = require('assert')
const co = require('co')

describe('aredis', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Aredis', async () => {
    let aredis = new Aredis()
    await aredis.set('testing:foo', 'bar')
    let foo = await aredis.get('testing:foo')
    assert.equal(foo, 'bar')

    await aredis.del('testing:baz')
    await aredis.hset('testing:baz', 'quz', 'quzz')
    let baz = await aredis.hgetall('testing:baz')
    assert.deepEqual(baz, { quz: 'quzz' })

    await aredis.hdel('testing:baz', 'quz')
    await aredis.hset('testing:baz', 'zoo', 'zuu')
    let baz2 = await aredis.hgetall('testing:baz')
    assert.deepEqual(baz2, { zoo: 'zuu' })
    
    await aredis.del('testing:baz')

    aredis.quit()
  })
})

/* global describe, before, after, it */
