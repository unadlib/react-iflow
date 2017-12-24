import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import iFlow from 'iflow'
import flow from 'react-iflow'

const store = iFlow({
  calculate: function (number){
    this.counter += number
  },
  counter: 0,
}).create()

@flow()
class Body extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <button onClick={() => this.props.store.calculate(-1)}>-</button>
        {this.props.store.counter}
        <button onClick={() => this.props.store.calculate(1)}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Body store={store}/>,
  document.getElementById('app')
)