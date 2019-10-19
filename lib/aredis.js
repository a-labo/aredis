
'use strict'

const redis = require('redis')

/**
 * Redis handler
 * @class ARedis
 * @param {Object} options
 */
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
   * @param {string} key
   * @param value
   * @returns {*}
   */
  async set (key, value) {
    return this._callClientMethodAsPromise('set', [...arguments])
  }

  /**
   * Get value
   * @param {string} key
   * @returns {*}
   */
  async get (key) {
    return this._callClientMethodAsPromise('get', [...arguments])
  }

  /**
   * Delete value
   * @param {string} key
   * @returns {*}
   */
  async del (key) {
    return this._callClientMethodAsPromise('del', [...arguments])
  }

  /**
   * Set hash key and value
   * @param {string} key
   * @param {string} hashKey
   * @param {*} hashValue
   * @returns {*}
   */
  async hset (key, hashKey, hashValue) {
    return this._callClientMethodAsPromise('hset', [...arguments])
  }

  /**
   * Set multiple hash value
   * @param {string} key
   * @param {...string|*} keyAndValues
   * @returns {*}
   */
  async hmset (key, ...keyAndValues) {
    return this._callClientMethodAsPromise('hmset', [...arguments])
  }

  /**
   * Get hash values
   * @param {string} key
   * @param {string} hashKey
   * @returns {*}
   */
  async hget (key, hashKey) {
    return this._callClientMethodAsPromise('hget', [...arguments])
  }

  /**
   * Delete hash values
   * @param {string} key
   * @param {string} hashKey
   * @returns {*}
   */
  async hdel (key, hashKey) {
    return this._callClientMethodAsPromise('hdel', [...arguments])
  }

  /**
   * Get all hash values as object
   * @param {string} key
   * @returns {*}
   */
  async hgetall (key) {
    return this._callClientMethodAsPromise('hgetall', [...arguments])
  }

  /**
   * List hash keys
   * @param {string} key
   * @returns {*}
   */
  async hkeys (key) {
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
