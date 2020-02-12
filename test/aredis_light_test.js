/**
 * Test case for aredisLight.
 * Runs with mocha.
 */
'use strict'

const AredisLight = require('../lib/aredis_light.js')
const assert = require('assert')

describe('aredis-light', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Aredis light', async () => {
    let aredis = new AredisLight(`${__dirname}/../tmp/testing-storage`)

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
