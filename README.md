# cerebral-computed
A package to expose computed cerebral state

```js
import computed from 'cerebral-computed'

export default computed({
  foo: 'some.state.path',
  bar: 'some.other.path'
}, (state) => {
  return state.foo + state.bar
})
```

This computed can be used in Cerebral view layers or actions:

```js
import { connect } from 'cerebral-view-react'
import myComputed from './myComputed.js'

export default connect({
  someProp: myComputed
}, (props) => (
  <div>{someProp}</div>
))
```

and from actions

```js
import myComputed from './myComputed.js'

export default ({ state }) => {
  const value = state.get(myComputed)
}
```

or as a factory

```js
import computed from 'cerebral-computed'

export default (props) => computed({
  foo: `some.state.${props.bar}`
}, (state) => {
  return state.foo
})
```

```js
import { connect } from 'cerebral-view-react'
import myComputed from './myComputedFactory.js'

export default connect((props) => (
  {
    someProp: myComputedFactory(props)
  }
), (props) => (
  <div>{someProp}</div>
))
```
