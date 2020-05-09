"use strict";
const writeJsonFile = require("write-json-file");
const cheerio = require("cheerio");
const got = require("hooman");

const main = async () => {
  try {
    // prettier-ignore
    const { body } = await got("https://techblog.willshouse.com/2012/01/03/most-common-user-agents/");

    const $ = cheerio.load(body);

    const userAgents = $("tbody .useragent")
      .map(function() {
        return $(this).text();
      })
      .get();

    await writeJsonFile("index.json", userAgents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
