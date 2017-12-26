import React, { Component } from 'react'
import flow from 'react-iflow'
import store from './store'

@flow([(store, props) => {
  return {
    arr: store.count.arr,
    add: store.count.add,
    calculate: store.count.calculate,
    e: props.size.a
  }
}], store)
export default class Body extends Component {
  render () {
    console.log('render Body')
    return (
      <div>
        <button onClick={() => this.props.add(1)}>-</button>
        {this.props.arr}
        <button onClick={() => this.props.calculate(1)}>+</button>
      </div>
    )
  }
}