'use strict'

const writeJsonFile = require('write-json-file')
const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')

const main = async () => {
  const body = await cloudscraper.get(
    'https://techblog.willshouse.com/2012/01/03/most-common-user-agents/'
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
