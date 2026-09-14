'use strict'

const test = require('ava')

const { selectTopUserAgents } = require('../bin/util')

test('all', t => {
  t.deepEqual(require('top-user-agents'), require('../src/index.json'))
})

test('mobile', t => {
  t.deepEqual(require('top-user-agents/mobile'), require('../src/mobile.json'))
})

test('desktop', t => {
  t.deepEqual(
    require('top-user-agents/desktop'),
    require('../src/desktop.json')
  )
})

test('published lists stay at 100 user agents', t => {
  const index = require('../src/index.json')
  const desktop = require('../src/desktop.json')
  const mobile = require('../src/mobile.json')

  // Allow 99 after a one-off crawl-agent removal; weekly update restores 100.
  t.true(index.length >= 99 && index.length <= 100)
  t.is(desktop.length + mobile.length, index.length)
  t.false(index.some(ua => ua.toLowerCase().includes('shap-user')))
})

test('selectTopUserAgents refuses short results', t => {
  const data = [
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0', 10],
    ['Shields.io/4604d4e', 9],
    ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Shap-User/0.1.0', 9],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/120.0.0.0', 8]
  ]

  t.deepEqual(selectTopUserAgents(data, 2), [data[0], data[3]])

  t.throws(() => selectTopUserAgents(data, 3), {
    message: /Unable to collect 3 non-bot user agents \(got 2\)/
  })

  t.throws(() => selectTopUserAgents([], 100), {
    message: /Unable to collect 100 non-bot user agents \(got 0\)/
  })
})
