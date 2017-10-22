/**
 * Create a new instance
 * @function create
 */
'use strict'

const ARedis = require('./aredis')

/** @lends create */
function create (args) {
  return new ARedis(...args)
}

module.exports = create
