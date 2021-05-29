const kNext = Symbol('next')
const kChain = Symbol('chain')

export default class Chain {
  constructor (hooks = {}) {
    this.tail = new Link(this, {})
    Object.assign(this, hooks)
  }

  add (data, end) {
    const newLink = new Link(this, data)
    if (end) newLink[kNext] = newLink
    this.tail[kNext] = newLink
    return (this.tail = newLink)
  }

  atEnd () {}
}

class Link {
  constructor (chain, data) {
    Object.defineProperties(this, {
      [kChain]: { value: chain, configurable: true },
      [kNext]: { configurable: true, writable: true }
    })
    return Object.assign(this, data)
  }

  next () {
    return this[kNext] ? this[kNext] : (this[kNext] = this[kChain].atEnd())
  }
}
