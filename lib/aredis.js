/**
 * Redis handler
 * @class ARedis
 * @param {Object} options
 */
'use strict'

const redis = require('redis')

/** @lends ARedis */
class ARedis {
  constructor (options = {}) {
    this.client = redis.createClient(options)
  }

  /**
   * Add event listener
   * @param name
   * @param handler
   * @returns {*}
   */
  on (name, handler) {
    return this._callClientMethod('on', [...arguments])
  }

  /**
   * Remove event listener
   * @param name
   * @param handler
   * @returns {*}
   */
  off (name, handler) {
    return this._callClientMethod('off', [...arguments])
  }

  /**
   * Quit client
   */
  quit () {
    return this._callClientMethod('quit', [...arguments])
  }

  /**
   * End client without waiting
   * @param {boolean} flush
   * @see https://github.com/NodeRedis/node_redis#clientendflush
   */
  end (flush) {
    return this._callClientMethod('end', [...arguments])
  }

  /**
   * Set value
   * @param key
   * @param value
   * @returns {*}
   */
  set (key, value) {
    return this._callClientMethodAsPromise('set', [...arguments])
  }

  /**
   * Get value
   * @param key
   * @returns {*}
   */
  get (key) {
    return this._callClientMethodAsPromise('get', [...arguments])
  }

  /**
   * Delete value
   * @param key
   * @returns {*}
   */
  del (key) {
    return this._callClientMethodAsPromise('del', [...arguments])
  }

  /**
   * Set hash key and value
   * @param key
   * @param hashKey
   * @param hashValue
   * @returns {*}
   */
  hset (key, hashKey, hashValue) {
    return this._callClientMethodAsPromise('hset', [...arguments])
  }

  /**
   * Set multiple hash value
   * @param key
   * @param keyAndValues
   * @returns {*}
   */
  hmset (key, ...keyAndValues) {
    return this._callClientMethodAsPromise('hmset', [...arguments])
  }

  /**
   * Get hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  hget (key, hashKey) {
    return this._callClientMethodAsPromise('hget', [...arguments])
  }

  /**
   * Delete hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  hdel (key, hashKey) {
    return this._callClientMethodAsPromise('hdel', [...arguments])
  }

  /**
   * Get all hash values as object
   * @param key
   * @returns {*}
   */
  hgetall (key) {
    return this._callClientMethodAsPromise('hgetall', [...arguments])
  }

  /**
   * List hash keys
   * @param key
   * @returns {*}
   */
  hkeys (key) {
    return this._callClientMethodAsPromise('hkeys', [...arguments])
  }

  _callClientMethod (name, args) {
    const { client } = this
    return client[name](...args)
  }

  _callClientMethodAsPromise (name, args) {
    const { client } = this
    return new Promise((resolve, reject) =>
      client[name](...[...args, (err, result) =>
        err ? reject(err) : resolve(result)
      ])
    )
  }
}

module.exports = ARedis
