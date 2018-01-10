# React iFlow

The connector for React 🌈 iFlow state management.


> **React iFlow** If you use React and iFlow to manage state, save all kinds of selectors cumbersome, while supporting a variety of user-defined store.

> 🔥🔥🔥**It is a highly efficient and concise React and iFlow store connector**🔥🔥🔥

### Features and benefits
* Least possible time selector
* Automatic array diff
* Full support comprehensive selector

### Install
```bash
yarn add react-iflow
//or
npm install --save react-iflow
```
### Getting started
To Edit
### The Gist
* `index.js`
```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Body from './body'
ReactDOM.render(<Body/>, document.getElementById('app'))
```
* `store.js`
```javascript
import iFlow from 'iflow'

const pipe = iFlow({
  calculate: function (number) {
    this.counter += number
  },
  counter: 0,
})

const store = pipe.create()
export default store
```
* `body.js`
```javascript
import React, { Component } from 'react'
import flow from 'react-iflow'
import store from './store'

class Body extends Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.store.calculate(-1)}>-</button>
        {this.props.store.counter}
        <button onClick={() => this.props.store.calculate(1)}>+</button>
      </div>
    )
  }
}

export default flow(store)(Body)
```
### Examples
[React with iFlow examples](https://github.com/unadlib/iflow/tree/master/examples)
### API
* flow -  the standard connector of iFlow store
```javascript
import flow from 'react-iflow'
```
`flow` is higher-order function，and it supports the decorator's writing. **If the last one argument of the flow is `store`, then the connected store will take it precedence.** 

- **Selector**: In fact, in most cases, 🎉🎉🎉**you don't need to use selectors**🎉🎉🎉, because iFlow will automatically help you diff state to determine if the component is updated, unless you need to compute derived data.

---
- Higher-order functions
```javascript
class CustomComponent extends Component {}
flow(store)(CustomComponent)
```

- Class decorator
```javascript
@flow()
class CustomComponent extends Component {}
```

- User-defined store
```javascript
@flow(store.count)
class CustomComponent extends Component {}
```

- With array selectors functions
```javascript
@flow([(state, props) =>{
  return {
    ...props,
    count: state.count,
  }
}],store)
class CustomComponent extends Component {}
```

- With arguments selectors functions
```javascript
@flow(
  (state, props) =>{
    return {
      ...props,
      count: state.count,
    }
  },
  (state, props) =>{
    return {
      ...props,
      counter: state.count.counter,
    }
  },
  store
)
class CustomComponent extends Component {}
```

* provider
```javascript
import { Provider } from 'react-iflow'
ReactDOM.render(<Provider store={store}><Body/></Provider>, document.getElementById('app'))
```
- `Provider` depend on the react's `context` to complete the cross component transfer, and its role is exactly the same as react-redux's Provider if you are familiar with react-redux

* connect
```javascript
import { connect } from 'react-iflow'
class CustomComponent extends Component {}
connect(CustomComponent)
```
When you call `Provider` inject store, you can use `connect` API to quickly connect store to the component, it's simple.
### License

---
MIT