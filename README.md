<div align="center">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only" alt="microlink logo">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only" alt="microlink logo">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/top-user-agents.svg?style=flat-square)
[![NPM Status](https://img.shields.io/npm/dm/top-user-agents.svg?style=flat-square)](https://www.npmjs.org/package/top-user-agents)

> The top 100 HTTP [user-agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)'s most used over Internet.

**Highlights**

- Only browser agents, not bots.
- Automagically up to date.
- A simple JSON file.

## Background

There are some scenarios where you need to perform browser-like requests, meaning you need to use an HTTP `user-agent` as much accurate as possible with the real world™️.

![](/stats.png)

You can find many list of browser user agents on the Internet, but they are outdated or quickly unmaintained.

This list is created collecting user agent from [microlink.io](https://microlink.io) products, that receives [+300M requests every month](https://analytics.microlink.io/).

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

## About Privacy

The information exposed to the user-agent only relies on coarse details.

In practice, anyone can put whatever they want in the user-agent string, and send it to the web server.

Because that, The user-agent cannot be sufficient condition to identify or reproduce the original request.

## Related

- [https-tls](https://github.com/Kikobeats/https-tls) – Setup TLS details according to `user-agent`.
- [top-crawler-agents](https://github.com/Kikobeats/top-crawler-agents) – A list of common crawler user agents useful for retrieving metadata from links.
- [@microlink/ua](https://github.com/microlinkhq/ua) – A simple redis primitives to incr() and top() user agents.

## License

**top-user-agents** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/top-user-agents/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/top-user-agents/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
