import React, { Component } from 'react'
import flow from 'react-iflow'
import store from './store'

@flow(store)
export default class Other extends Component {
  render () {
    console.log('render Other')
    return (
      <div>
        {this.props.store.c.length}
      </div>
    )
  }
}