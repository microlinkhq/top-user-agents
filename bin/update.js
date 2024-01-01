'use strict'

const { writeFile } = require('fs/promises')
const { top } = require('./util')

async function main (n) {
  const userAgents = (await top(n)).map(([userAgent]) => userAgent)
  await writeFile('index.json', JSON.stringify(userAgents, null, 2))
}

main(100)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
