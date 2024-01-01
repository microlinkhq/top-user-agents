'use strict'

const Redis = require('ioredis')

async function main () {
  const redis = new Redis(process.env.REDIS_UA_URI)
  const ua = require('@microlink/ua')(redis)
  return ua.flush()
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
