import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import iFlow from 'iflow'
import flow from 'react-iflow'

const store = iFlow({
  count: {
    calculate: function (number) {
      this.c.c = number
      // this.counter += number
      // this.x = (n) => alert(n)
      // this.a[this.counter+2] = {b:[1]}
      this.a.push(1)
      // this.a.push(1)
      // this.a[number] = number
    },
    xxx: function () {
      delete this.c.c
    },
    counter: 0,
    c: {
      b: {
        E:1
      }
    },
    a: [1,2,3,4],
  }
}).create()

@flow()
class Body extends Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.store.count.xxx(-1)}>-</button>
        {JSON.stringify(this.props.store.count.c.b)}
        {/*{Object.keys(this.props.store.count.c).map(i=>i)}*/}
        {/*{arr}*/}
        {this.props.store.count.a.length}
        <button onClick={() => this.props.store.count.calculate(1)}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Body store={store}/>,
  document.getElementById('app')
)