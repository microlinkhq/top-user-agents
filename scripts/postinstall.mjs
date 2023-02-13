import writeJsonFile from 'write-json-file'
import { load } from 'cheerio'
import got from 'got'

const URL =
  'https://techblog.willshouse.com/2012/01/03/most-common-user-agents/'

try {
  const body = await got(URL, {
    retry: { limit: 0 },
    timeout: { request: 10000 },
    resolveBodyOnly: true
  })

  const $ = load(body)

  const userAgents = $('tbody .useragent')
    .map(function () {
      return $(this).text()
    })
    .get()

  await writeJsonFile('index.json', userAgents)
} catch (error) {
  // techblog is using CloudFlare protection,
  // so it's expected to fail.
  // In that case, the fallback file commited with the project will be used.
  process.exit(0)
}
