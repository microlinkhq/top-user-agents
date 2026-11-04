'use strict'

const Module = require('module')
const test = require('ava')

const CHROME_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36'

const calls = []
const realLoad = Module._load
const realUa = realLoad.call(module, '@microlink/ua', module, false)

Module._load = function (request, parent, isMain) {
  if (request === 'ioredis') return class Redis {}
  if (request === '@microlink/ua') {
    const factory = () => ({
      async top (limit, options) {
        calls.push([limit, options])
        return [
          ['Event-Admin/1.0 (thumbnail)', 2],
          [CHROME_WINDOWS, 1]
        ]
      }
    })
    factory.isBrowser = realUa.isBrowser
    return factory
  }
  return realLoad.apply(this, arguments)
}

const { top } = require('../bin/util')

test.after(() => {
  Module._load = realLoad
})

test('top fetches two scored candidates per slot, drops non-browsers, and trims', async t => {
  t.deepEqual(await top(1), [[CHROME_WINDOWS, 1]])
  t.deepEqual(calls, [[2, { withScore: true }]])
})
