# top-user-agents

![Last version](https://img.shields.io/github/tag/Kikobeats/top-user-agents.svg?style=flat-square)
[![NPM Status](https://img.shields.io/npm/dm/top-user-agents.svg?style=flat-square)](https://www.npmjs.org/package/top-user-agents)

> A list of most common User Agent used on Internet.

The list is auto generated, always up to date with the most common user agents.

## Install

```bash
$ npm install top-user-agents --save
```

## Usage

```js
const uniqueRandomArray = require('unique-random-array')
const userAgents = require('top-user-agents')

const randomUserAgent = uniqueRandomArray(userAgents)

console.log(randomUserAgent())
// => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
```

## Related

- [top-crawler-agents](https://github.com/Kikobeats/top-crawler-agents) – A list of common crawler user agents useful for retrieving metadata from links.

**top-user-agents** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/top-user-agents/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/top-user-agents/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
