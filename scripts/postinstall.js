'use strict'

const writeJsonFile = require('write-json-file')
const cheerio = require('cheerio')
const got = require('got')

const main = async () => {
  const body = await got(
    'https://techblog.willshouse.com/2012/01/03/most-common-user-agents/',
    {
      retry: 0,
      timeout: 10000,
      resolveBodyOnly: true
    }
  )

  const $ = cheerio.load(body)

  const userAgents = $('tbody .useragent')
    .map(function () {
      return $(this).text()
    })
    .get()

  await writeJsonFile('index.json', userAgents)
}

main()
  .catch(err => console.error(err) && process.exit(1))
  .then(process.exit)
