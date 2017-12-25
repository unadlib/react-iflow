import React, { Component } from 'react'
import flow from 'react-iflow'

@flow()
export default class Body extends Component {
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