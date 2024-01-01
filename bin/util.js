'use strict'

const debug = require('debug-logfmt')('ua:isbot')
const { isbot } = require('isbot')

const connect = () =>
  this.instance ||
  (this.instance = require('@microlink/ua')(
    new Redis(process.env.REDIS_UA_URI)
  ))

const Redis = require('ioredis')

const isBot = userAgent => {
  const result =
    isbot(userAgent) ||
    ['rest-client', 'retweet', 'SpringBoard'].some(str =>
      userAgent.includes(str)
    )
  if (result) debug(userAgent)
  return result
}

const top = async n => {
  const ua = connect()
  const limit = n + Math.round(n * 0.3)
  const data = await ua.top(limit, { withScore: true })
  return data.filter(userAgent => !isBot(userAgent[0])).slice(0, n)
}

module.exports = { top }
