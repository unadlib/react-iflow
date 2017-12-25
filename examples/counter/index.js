import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import iFlow from 'iflow'
import Body from './body'
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

ReactDOM.render(
  <Body store={store}/>,
  document.getElementById('app')
)