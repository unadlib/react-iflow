import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import iFlow from 'iflow'
import flow from 'react-iflow'

const store = iFlow({
  count: {
    calculate: function (number){
      this.counter += number
      // this.a.push(1)
      // this.a[number] = number
    },
    counter: 0,
    a: [1,2,3],
  }
}).create()

@flow()
class Body extends Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.store.count.calculate(-1)}>-</button>
        {this.props.store.count.counter}
        {/*{this.props.store.count.a.join('')}*/}
        <button onClick={() => this.props.store.count.calculate(1)}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Body store={store}/>,
  document.getElementById('app')
)