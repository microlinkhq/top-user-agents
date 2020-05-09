'use strict'
const got = require('hooman')
const { parse } = require('node-html-parser')
const writeJsonFile = require('write-json-file')

const main = async () => {
  try {
    // prettier-ignore
    const { body } = await got("https://techblog.willshouse.com/2012/01/03/most-common-user-agents/");

    // User-Agents
    const userAgents = parse(body) // parse html body
      .querySelector('.get-the-list') // get user-agents
      .text.split('\n') // convert html list to javascript array
      .filter(ua => ua.includes(';')) // filter by valid values

    // Save to file
    await writeJsonFile('index.json', userAgents)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
