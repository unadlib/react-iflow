# React iFlow

The connector for React 🌈 iFlow state management.

[![Travis](https://img.shields.io/travis/unadlib/react-iflow.svg)](https://travis-ci.org/unadlib/react-iflow)
[![Coverage Status](https://coveralls.io/repos/github/unadlib/react-iflow/badge.svg?branch=master)](https://coveralls.io/github/unadlib/react-iflow?branch=master)
[![npm](https://img.shields.io/npm/v/react-iflow.svg)](https://www.npmjs.com/package/react-iflow)

> **React iFlow** If you use React and iFlow to manage state, save all kinds of selectors cumbersome, while supporting a variety of user-defined store.

> 🔥🔥🔥**It is a highly efficient and concise React and iFlow store connector**🔥🔥🔥

### Features and benefits
* Least possible time selector
* Automatic array diff
* Full support comprehensive selector
* Support immutable

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
[Counter](https://jsfiddle.net/unadlib/03ukqj5L/1/)(Online)
[TODO](https://jsfiddle.net/unadlib/6wabhdqp/)(Online)
### API
#### flow
It's the standard connector of iFlow store
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
If use `Provider`, you don't need to pass the store argument, unless you need to set the selector.
```javascript
class CustomComponent extends Component {}
flow()(CustomComponent)
```
More concise way
```javascript
import { connect } from 'react-iflow'
class CustomComponent extends Component {}
connect(CustomComponent)
```
- Class decorator
```javascript
@flow()
class CustomComponent extends Component {}
```

- User-defined select node store
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

#### provider
```javascript
import { Provider } from 'react-iflow'
ReactDOM.render(<Provider store={store}><Body/></Provider>, document.getElementById('app'))
```
- `Provider` depend on the react's `context` to complete the cross component transfer, and its role is exactly the same as react-redux's Provider if you are familiar with react-redux

#### connect
```javascript
import { connect } from 'react-iflow'
class CustomComponent extends Component {}
connect(CustomComponent)
```
When you call `Provider` inject store, you can use `connect` API to quickly connect store to the component, it's simple.

#### immutable

* Single-layer immutable store is effective when using immutable

`@immutable`is a single-layer traversal props, so the mixed structure of the iFlow store and plain objects is invalid.
  
For example:

 ```javascript
 class Parent extends Component {
   // this.props.sub is iflow store
   render <Sub store={this.props.sub} />
 }
 
 @immutable
 class Sub extends Component {
   // omit
 }
 ```
This is effective. But the following example is not valid:
 
 ```javascript
 class Parent extends Component {
   // this.props.sub is iflow store
   render <Sub store={{foo:'bar', sub: this.props.sub}} />
 }
 
 @immutable
 class Sub extends Component {
   // omit
 }
 ```

Of course, if you're not using `@immutable` You can arbitrarily pass the iFlow store.

* About the Usage of PureComponent
 
Because the iFlow connector uses the mutable store by default, So the connector directly with the React.PureComponent connection will not be updated, iFlow connector corresponding component should be react.Component, do not worry, iFlow will automatically diff comparison, it is more efficient and automatic than the light comparison of React.PureComponent.

If you really need to use react.PureComponent, then it is recommended that you could use cooperatively with `@immutable`. This is a great help in Sub-Component performance optimization.
 
For example:

 ```javascript
 @flow(store)
 @immutable
 class Body extends PureComponent {
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
 ```
 
### License

---
MIT