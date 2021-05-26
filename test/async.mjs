import { test } from 'uvu'
import * as assert from 'uvu/assert'

import sleep from 'pixutil/sleep'

import Chain from '../src/index.mjs'

test('add then read', async () => {
  const c = new Chain()
  let node = c.tail

  c.add({ name: 'foo' })
  c.add({ name: 'bar' })

  node = await node.next()
  assert.equal({ ...node }, { name: 'foo' })
  node = await node.next()
  assert.equal({ ...node }, { name: 'bar' })
})

test('on demand', async () => {
  let x = 0
  const c = new Chain({
    async atEnd () {
      await sleep(50)
      return this.add({ value: ++x })
    }
  })

  let node = c.tail

  node = await node.next()
  assert.equal({ ...node }, { value: 1 })
  node = await node.next()
  assert.equal({ ...node }, { value: 2 })
})

test('ending', async () => {
  const c = new Chain({
    async atEnd () {
      await sleep(50)
      return this.add({ done: true }, true)
    }
  })
  let node = c.tail
  c.add({ foo: 'bar' })

  node = await node.next()
  assert.equal({ ...node }, { foo: 'bar' })
  node = await node.next()
  assert.equal({ ...node }, { done: true })

  assert.is(node, await node.next())
})
test.run()
