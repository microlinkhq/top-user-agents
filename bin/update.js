'use strict'

const { writeFile } = require('fs/promises')
const uaParser = require('ua-parser-js')
const { top } = require('./util')

const stringify = data => JSON.stringify(data, null, 2)

async function main (n) {
  const userAgents = (await top(n)).map(([userAgent]) => userAgent)
  await writeFile('src/index.json', stringify(userAgents))

  const { mobile, desktop } = userAgents.reduce(
    (acc, userAgent) => {
      const device = uaParser(userAgent).device.type
      if (device === 'tablet' || device === 'mobile') {
        acc.mobile.push(userAgent)
      } else {
        acc.desktop.push(userAgent)
      }
      return acc
    },
    { mobile: [], desktop: [] }
  )

  await writeFile('src/desktop.json', stringify(desktop))
  await writeFile('src/mobile.json', stringify(mobile))
}

main(100)
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
