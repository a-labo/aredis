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
    const s = this
    s.client = redis.createClient(options)
  }

  /**
   * Add event listener
   * @param name
   * @param handler
   * @returns {*}
   */
  on (name, handler) {
    const s = this
    return s._callClientMethod('on', [...arguments])
  }

  /**
   * Remove event listener
   * @param name
   * @param handler
   * @returns {*}
   */
  off (name, handler) {
    const s = this
    return s._callClientMethod('off', [...arguments])
  }

  /**
   * Quit client
   */
  quit () {
    const s = this
    return s._callClientMethod('quit', [...arguments])
  }

  /**
   * End client without waiting
   * @param {boolean} flush
   * @see https://github.com/NodeRedis/node_redis#clientendflush
   */
  end (flush) {
    const s = this
    return s._callClientMethod('end', [...arguments])
  }

  /**
   * Set value
   * @param key
   * @param value
   * @returns {*}
   */
  set (key, value) {
    const s = this
    return s._callClientMethodAsPromise('set', [...arguments])
  }

  /**
   * Get value
   * @param key
   * @returns {*}
   */
  get (key) {
    const s = this
    return s._callClientMethodAsPromise('get', [...arguments])
  }

  /**
   * Delete value
   * @param key
   * @returns {*}
   */
  del (key) {
    const s = this
    return s._callClientMethodAsPromise('del', [...arguments])
  }

  /**
   * Set hash key and value
   * @param key
   * @param hashKey
   * @param hashValue
   * @returns {*}
   */
  hset (key, hashKey, hashValue) {
    const s = this
    return s._callClientMethodAsPromise('hset', [...arguments])
  }

  /**
   * Set multiple hash value
   * @param key
   * @param keyAndValues
   * @returns {*}
   */
  hmset (key, ...keyAndValues) {
    const s = this
    return s._callClientMethodAsPromise('hmset', [...arguments])
  }

  /**
   * Get hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  hget (key, hashKey) {
    const s = this
    return s._callClientMethodAsPromise('hget', [...arguments])
  }

  /**
   * Delete hash values
   * @param key
   * @param hashKey
   * @returns {*}
   */
  hdel (key, hashKey) {
    const s = this
    return s._callClientMethodAsPromise('hdel', [...arguments])
  }

  /**
   * Get all hash values as object
   * @param key
   * @returns {*}
   */
  hgetall (key) {
    const s = this
    return s._callClientMethodAsPromise('hgetall', [...arguments])
  }

  /**
   * List hash keys
   * @param key
   * @returns {*}
   */
  hkeys (key) {
    const s = this
    return s._callClientMethodAsPromise('hkeys', [...arguments])
  }

  _callClientMethod (name, args) {
    const s = this
    const {client} = s
    return client[name](...args)
  }

  _callClientMethodAsPromise (name, args) {
    const s = this
    const {client} = s
    return new Promise((resolve, reject) =>
      client[name](...[...args, (err, result) =>
        err ? reject(err) : resolve(result)
      ])
    )
  }
}

module.exports = ARedis
