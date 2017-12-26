import React, { Component } from 'react'
import flow from 'react-iflow'
import store from './store'

@flow(store)
export default class Other extends Component {
  render () {
    console.log('render Other')
    let i = 3
    let arr = []
    while( i-- > 0) {
      arr.push(this.props.store.count.arr[i])
    }
    return (
      <div>
        {arr}
      </div>
    )
  }
}