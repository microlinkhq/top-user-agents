'use strict'

const { writeFile } = require('fs/promises')
const { isbot } = require('isbot')
const Redis = require('ioredis')

const ua = require('@microlink/ua')(new Redis(process.env.REDIS_UA_URI))

async function main () {
  const data = await ua.top(120)
  const userAgents = data.filter(userAgent => !isbot(userAgent)).slice(0, 100)
  await writeFile('index.json', JSON.stringify(userAgents, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
