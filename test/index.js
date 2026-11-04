'use strict'

const test = require('ava')

const { selectTopUserAgents, isRealBrowser } = require('../bin/util')

const MAX_PUBLISHED_SIZE = 100
const MIN_PUBLISHED_SIZE = 90

const CHROME_WINDOWS =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36'
const SAFARI_MACOS =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15'

const ISSUE_60_ENTRIES = [
  'Event-Admin/1.0 (thumbnail)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)'
]

const PREVIOUSLY_EXCLUDED = [
  'Shields.io/4604d4e',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Shap-User/0.1.0',
  'ThoughLoom/1.0 (retrieval-ladder)',
  'Deno/2.1.4 (variant; SupabaseEdgeRuntime/1.69.25)',
  'Dart/3.8 (dart:io)'
]

const published = {
  index: require('../src/index.json'),
  desktop: require('../src/desktop.json'),
  mobile: require('../src/mobile.json')
}

test('all', t => {
  t.deepEqual(require('top-user-agents'), published.index)
})

test('mobile', t => {
  t.deepEqual(require('top-user-agents/mobile'), published.mobile)
})

test('desktop', t => {
  t.deepEqual(require('top-user-agents/desktop'), published.desktop)
})

test('published lists keep their size', t => {
  const { index, desktop, mobile } = published
  t.true(index.length >= MIN_PUBLISHED_SIZE)
  t.true(index.length <= MAX_PUBLISHED_SIZE)
  t.is(desktop.length + mobile.length, index.length)
})

for (const [name, list] of Object.entries(published)) {
  test(`published ${name} list only has real browsers`, t => {
    t.deepEqual(
      list.filter(userAgent => !isRealBrowser(userAgent)),
      []
    )
  })
}

test('rejects the entries reported in issue #60', t => {
  for (const userAgent of ISSUE_60_ENTRIES) t.false(isRealBrowser(userAgent))
})

test('rejects what the old exclusion list caught', t => {
  for (const userAgent of PREVIOUSLY_EXCLUDED) {
    t.false(isRealBrowser(userAgent))
  }
})

test('selectTopUserAgents keeps ranking order and drops non-browsers', t => {
  const data = [
    [CHROME_WINDOWS, 10],
    [ISSUE_60_ENTRIES[0], 9],
    [ISSUE_60_ENTRIES[2], 9],
    [PREVIOUSLY_EXCLUDED[0], 9],
    [SAFARI_MACOS, 8]
  ]

  t.deepEqual(selectTopUserAgents(data, 2), [data[0], data[4]])
})

test('selectTopUserAgents refuses short results', t => {
  const data = [
    [CHROME_WINDOWS, 10],
    [ISSUE_60_ENTRIES[0], 9],
    [SAFARI_MACOS, 8]
  ]

  t.throws(() => selectTopUserAgents(data, 3), {
    message: /Unable to collect 3 real browser user agents \(got 2\)/
  })

  t.throws(() => selectTopUserAgents([], 100), {
    message: /Unable to collect 100 real browser user agents \(got 0\)/
  })
})
