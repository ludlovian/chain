import { test } from 'uvu'
import * as assert from 'uvu/assert'

import Chain from '../src/index.mjs'

test('add then read', () => {
  const c = new Chain()
  let node = c.tail

  c.add({ name: 'foo' })
  c.add({ name: 'bar' })

  node = node.next()
  assert.equal({ ...node }, { name: 'foo' })
  node = node.next()
  assert.equal({ ...node }, { name: 'bar' })
})

test('on demand', () => {
  let x = 0
  const c = new Chain({
    atEnd () {
      return this.add({ value: ++x })
    }
  })

  let node = c.tail

  node = node.next()
  assert.equal({ ...node }, { value: 1 })
  node = node.next()
  assert.equal({ ...node }, { value: 2 })
})

test('ending', () => {
  function atEnd () {
    return this.add({ done: true }, true)
  }
  const c = new Chain({ atEnd })
  let node = c.tail
  c.add({ foo: 'bar' })

  node = node.next()
  assert.equal({ ...node }, { foo: 'bar' })
  node = node.next()
  assert.equal({ ...node }, { done: true })

  assert.is(node, node.next())
})

test.run()
