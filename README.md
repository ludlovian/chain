# Chain
Simple single-linked danlging list.

A chain is a simple single-list that only keeps track of its tail.
This is useful for streams of data, where you only want to track
data from a given point onwards.

## Chain
`ch = new Chain({ atEnd })`

Creates a new chain.

If supplied, the given `atEnd` hook is installed *see below*.

### chain.tail

The current tail of the chain, which is a `Link` object *see below*.

### chain.add(object, end?)

Add a new link to the chain, advancing the tail. If `end` is set, then
this new link will be attached to itself terminating the chain,
unless you add more.

It returns the new link added.

### chain.atEnd() => item

A function which is called when a reader tries to read beyond the tail of the
chain. The next item pointer will be set to whatever this returns.

If you are working with async functions, then this will obviously return a
promise (which might be resolved, rejected or remain pending. You might, of course,
update the pointer manually after this ;-).

## Link

A link, or node, in a chain. In addition to the data props it carries, it also
offers the following:

### link.next()

Returns the next link in the chain if set. If there is no next link
(i.e.already at the tail), then any `atEnd` is called to populate the next one
if possible.
