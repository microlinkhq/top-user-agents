'use strict'
const got = require('hooman')
const { parse } = require('node-html-parser')
const writeJsonFile = require('write-json-file')

const main = async () => {
  try {
    // prettier-ignore
    const { body } = await got("https://techblog.willshouse.com/2012/01/03/most-common-user-agents/");

    // User-Agents
    const userAgents = parse(body).querySelector('.get-the-list').text

    // Save to file
    await writeJsonFile('index.json', userAgents.split('\n'))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
