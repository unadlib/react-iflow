import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-iflow'
import Body from './body'
import Other from './other'
import store from './store'

ReactDOM.render(
  <div>
    <Body size={{a:1}}/>
    <Other size={{a:22}}/>
  </div>
  ,
  document.getElementById('app')
)