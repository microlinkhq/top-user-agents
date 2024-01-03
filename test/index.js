'use strict'

const test = require('ava')

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
