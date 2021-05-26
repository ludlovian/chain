export default class Chain {
  constructor (hooks = {}) {
    this.tail = new Link(this, {})
    Object.assign(this, hooks)
  }

  add (data, end) {
    const newLink = new Link(this, data)
    if (end) newLink._next = newLink
    this.tail._next = newLink
    return (this.tail = newLink)
  }

  atEnd () {}
}

class Link {
  constructor (chain, data) {
    Object.defineProperties(this, {
      _chain: { value: chain, configurable: true },
      _next: { configurable: true, writable: true }
    })
    return Object.assign(this, data)
  }

  next () {
    return this._next ? this._next : (this._next = this._chain.atEnd())
  }
}
