/**
 * Test case for aredis.
 * Runs with mocha.
 */
'use strict'

const Aredis = require('../lib/aredis.js')
const assert = require('assert').strict

describe('aredis', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Aredis', async () => {
    const aredis = new Aredis()
    await aredis.set('testing:foo', 'bar')
    const foo = await aredis.get('testing:foo')
    assert.equal(foo, 'bar')

    await aredis.del('testing:baz')
    await aredis.hset('testing:baz', 'quz', 'quzz')
    const baz = await aredis.hgetall('testing:baz')
    assert.deepEqual(baz, { quz: 'quzz' })

    assert.deepEqual(await aredis.hkeys('testing:baz'), ['quz'])
    assert.equal(await aredis.hget('testing:baz', 'quz'), 'quzz')

    await aredis.hdel('testing:baz', 'quz')
    await aredis.hset('testing:baz', 'zoo', 'zuu')
    const baz2 = await aredis.hgetall('testing:baz')
    assert.deepEqual(baz2, { zoo: 'zuu' })

    await aredis.del('testing:baz')

    await aredis.hmset('x', 'a', 1, 'b', 2)
    assert.deepEqual(await aredis.hgetall('x'), { a: '1', b: '2' })

    aredis.quit()
  })
})

/* global describe, before, after, it */
