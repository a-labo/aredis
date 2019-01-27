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
    this._handlers = {}
    this.storage = akv(path.resolve(dirname, 'aredis.data.json'), {
      interval: 100
    })
  }

  /**
   * Add event listener
   * @param name
   * @param handler
   */
  on (name, handler) {
    this._handlers[name] = this._handlers[name] || []
    this._handlers[name].push(handler)
  }

  /**
   * Remove event listener
   * @param name
   * @param handler
   */
  off (name, handler) {
    this._handlers[name] = (this._handlers[name] || [])
      .filter((filtering) => filtering !== handler)
  }

  /**
   * Quit client
   */
  quit () {
    const { storage } = this
    return storage.commit()
  }

  /**
   * End client without waiting
   * @param {boolean} flush
   * @see https://github.com/NodeRedis/node_redis#clientendflush
   */
  end (flush) {
    const { storage } = this
    return storage.commit()
  }

  /**
   * Set value
   * @param key
   * @param value
   * @returns {*}
   */
  async set (key, value) {
    await this._write(key, value)
  }

  /**
   * Get value
   * @param key
   * @returns {*}
   */
  async get (key) {
    return await this._read(key)
  }

  /**
   * Delete value
   * @param key
   * @returns {*}
   */
  async del (key) {
    await this._unlink(key)
  }

  /**
   * Set hash key and value
   * @param key
   * @param hashKey
   * @param hashValue
   * @returns {*}
   */
  async hset (key, hashKey, hashValue) {
    {
      // if object passed
      const hashValues = arguments[1]
      if (typeof hashValues === 'object') {
        for (let hashKey of Object.keys(hashValues)) {
          await this.hset(key, hashKey, hashValues[hashKey])
        }
        return
      }
    }
    let hash = await
      this._read(key)
    hash = hash || {}
    hash[hashKey] = hashValue
    await this._write(key, hash)
  }

  /**
   * Set multiple hash value
   * @param key
   * @param hashKeyAndValues
   * @returns {*}
   */
  async hmset (key, ...hashKeyAndValues) {
    let hash = await this._read(key)
    hash = hash || {}
    for (let i = 0; i < hashKeyAndValues.length; i += 2) {
      let hashKey = hashKeyAndValues[i]
      hash[hashKey] = hashKeyAndValues[i + 1]
    }
    await this._write(key, hash)
  }

  /**
   * Get hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  async hget (key, hashKey) {
    let hash = await
      this._read(key)
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
    let hash = await this._read(key)
    hash = hash || {}
    delete hash[hashKey]
    await this._write(key, hash)
  }

  /**
   * Get all hash values as object
   * @param key
   * @returns {*}
   */
  async hgetall (key) {
    const hash = await this._read(key)
    return hash || {}
  }

  /**
   * List hash keys
   * @param key
   * @returns {*}
   */
  async hkeys (key) {
    const hash = await this._read(key)
    return Object.keys(hash || {})
  }

  _write (key, value) {
    const { storage } = this
    return storage.set(key, value)
  }

  _unlink (key) {
    const { storage } = this
    return storage.destroy()
  }

  _read (key) {
    const { storage } = this
    return storage.get(key)
  }

}

module.exports = ARedis
