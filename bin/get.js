'use strict'

const { top } = require('./util')

const percentage = (count, total) => `${((count / total) * 100).toFixed(2)}%`

async function main (n) {
  const userAgents = await top(n)
  const total = userAgents.reduce((acc, [_, count]) => acc + count, 0)
  userAgents.forEach(([userAgent, count], index) =>
    console.log(
      `${index + 1} (${count} / ${percentage(count, total)})\t–  ${userAgent}`
    )
  )
}

main(Number(process.argv[2] ?? 50))
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
