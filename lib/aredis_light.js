/**
 * Light hand redis.
 * Using file system instead of redis server
 * @class ARedisLight
 * @param {string} dirname - Base directory path
 * @param {Object} options
 */
'use strict'

const path = require('path')
const akv = require('akv')

/** @lends ARedis */
class ARedis {
  constructor (dirname) {
    const s = this
    s._handlers = {}
    s.storage = akv(path.resolve(dirname, 'aredis.data.json'), {
      interval: 100
    })
  }

  /**
   * Add event listener
   * @param name
   * @param handler
   */
  on (name, handler) {
    const s = this
    s._handlers[name] = s._handlers[name] || []
    s._handlers[name].push(handler)
  }

  /**
   * Remove event listener
   * @param name
   * @param handler
   */
  off (name, handler) {
    const s = this
    s._handlers[name] = (s._handlers[name] || [])
      .filter((filtering) => filtering !== handler)
  }

  /**
   * Quit client
   */
  quit () {
    const s = this
    const {storage} = s
    return storage.commit()
  }

  /**
   * End client without waiting
   * @param {boolean} flush
   * @see https://github.com/NodeRedis/node_redis#clientendflush
   */
  end (flush) {
    const s = this
    const {storage} = s
    return storage.commit()
  }

  /**
   * Set value
   * @param key
   * @param value
   * @returns {*}
   */
  async set (key, value) {
    const s = this
    await s._write(key, value)
  }

  /**
   * Get value
   * @param key
   * @returns {*}
   */
  async get (key) {
    const s = this
    return await s._read(key)
  }

  /**
   * Delete value
   * @param key
   * @returns {*}
   */
  async del (key) {
    const s = this
    await s._unlink(key)
  }

  /**
   * Set hash key and value
   * @param key
   * @param hashKey
   * @param hashValue
   * @returns {*}
   */
  async hset (key, hashKey, hashValue) {
    const s = this
    {
      // if object passed
      const hashValues = arguments[1]
      if (typeof hashValues === 'object') {
        for (let hashKey of Object.keys(hashValues)) {
          await s.hset(key, hashKey, hashValues[hashKey])
        }
        return
      }
    }
    let hash = await
      s._read(key)
    hash = hash || {}
    hash[hashKey] = hashValue
    await s._write(key, hash)
  }

  /**
   * Set multiple hash value
   * @param key
   * @param hashKeyAndValues
   * @returns {*}
   */
  async hmset (key, ...hashKeyAndValues) {
    const s = this
    let hash = await s._read(key)
    hash = hash || {}
    for (let i = 0; i < hashKeyAndValues.length; i += 2) {
      let hashKey = hashKeyAndValues[i]
      hash[hashKey] = hashKeyAndValues[i + 1]
    }
    await s._write(key, hash)
  }

  /**
   * Get hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  async hget (key, hashKey) {
    const s = this
    let hash = await
      s._read(key)
    hash = hash || {}
    return hash[hashKey]
  }

  /**
   * Delete hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  async hdel (key, hashKey) {
    const s = this
    let hash = await s._read(key)
    hash = hash || {}
    delete hash[hashKey]
    await s._write(key, hash)
  }

  /**
   * Get all hash values as object
   * @param key
   * @returns {*}
   */
  async hgetall (key) {
    const s = this
    const hash = await s._read(key)
    return hash || {}
  }

  /**
   * List hash keys
   * @param key
   * @returns {*}
   */
  async hkeys (key) {
    const s = this
    const hash = await s._read(key)
    return Object.keys(hash || {})
  }

  _write (key, value) {
    const s = this
    const {storage} = s
    return storage.set(key, value)
  }

  _unlink (key) {
    const s = this
    const {storage} = s
    return storage.destroy()
  }

  _read (key) {
    const s = this
    const {storage} = s
    return storage.get(key)
  }

}

module.exports = ARedis
