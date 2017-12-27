import React, { Component } from 'react'
import flow from 'react-iflow'
import store from './store'

@flow(store)
export default class Body extends Component {
  render () {
    console.log('render Body')
    return (
      <div>
        <button onClick={() => this.props.store.add(1)}>-</button>
        {/*{this.props.arr}*/}
        <button onClick={() => this.props.store.calculate()}>+</button>
      </div>
    )
  }
}