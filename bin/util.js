'use strict'

const debug = require('debug-logfmt')('ua:rejected')
const { isBrowser } = require('@microlink/ua')
const Redis = require('ioredis')

const CANDIDATES_PER_SLOT = 2

const connect = () =>
  this.instance ||
  (this.instance = require('@microlink/ua')(
    new Redis(process.env.REDIS_UA_URI)
  ))

const isRealBrowser = userAgent => {
  const result = isBrowser(userAgent)
  if (!result) debug(userAgent)
  return result
}

const selectTopUserAgents = (data, n) => {
  const filtered = data
    .filter(([userAgent]) => isRealBrowser(userAgent))
    .slice(0, n)
  if (filtered.length < n) {
    throw new Error(
      `Unable to collect ${n} real browser user agents (got ${filtered.length}). Refusing to update.`
    )
  }
  return filtered
}

const top = async n => {
  const ua = connect()
  const data = await ua.top(n * CANDIDATES_PER_SLOT, { withScore: true })
  return selectTopUserAgents(data, n)
}

module.exports = { top, selectTopUserAgents, isRealBrowser }
