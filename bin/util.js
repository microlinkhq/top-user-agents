'use strict'

const debug = require('debug-logfmt')('ua:isbot')
const { isbot } = require('isbot')
const Redis = require('ioredis')

const connect = () =>
  this.instance ||
  (this.instance = require('@microlink/ua')(
    new Redis(process.env.REDIS_UA_URI)
  ))

const EXCLUSIONS = [
  'autofill',
  'cfnetwork',
  'claude',
  'cloudinary',
  'dart/',
  'networkingextension',
  'retweet',
  'shields.io',
  'supabaseedgeruntime/'
]

const isBot = userAgent => {
  const result =
    isbot(userAgent) ||
    EXCLUSIONS.some(str => userAgent.toLowerCase().includes(str))
  if (result) debug(userAgent)
  return result
}

/**
 * Keep the top `n` non-bot user agents.
 * Throws when filtering cannot fill the requested size so we never
 * publish an empty/short list after a Redis flush or sparse dataset.
 */
const selectTopUserAgents = (data, n) => {
  const filtered = data.filter(userAgent => !isBot(userAgent[0])).slice(0, n)
  if (filtered.length < n) {
    throw new Error(
      `Unable to collect ${n} non-bot user agents (got ${filtered.length}). Refusing to update.`
    )
  }
  return filtered
}

const top = async n => {
  const ua = connect()
  const limit = n + Math.round(n * 0.3)
  const data = await ua.top(limit, { withScore: true })
  return selectTopUserAgents(data, n)
}

module.exports = { top, selectTopUserAgents, isBot }
