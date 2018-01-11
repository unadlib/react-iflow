import React, { Component, PureComponent } from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { render, shallow, mount } from 'enzyme'
import iFlow from 'iflow'
import flow, {
  connect,
  Provider
} from '../lib'

Enzyme.configure({adapter: new Adapter()})

/* global test, expect */

class Count {
  counter = 0

  calculate (number) {
    this.counter += number
  }
}

const store = iFlow({
  count: new Count(),
  arr: [{
    foobar: {
      test: 1,
    }
  }],
  m: {
    x: 1,
  },
  n: 0,
  testAdd () {
    this.m.x += 1
  },
  get a () {
    return this.n
  },
  get b () {
    return this.m.x
  },
  get test () {
    return this.a + this.b
  },
}).create()

@flow((state, props) => {
  return {
    counter: state.counter + props.test,
  }
}, store.count)
class CountComponent extends Component {
  render () {
    return (
      <div>
        <p className={'foo'}>{this.props.counter}</p>
        <p className={'foo'}>{this.props.test}</p>
      </div>
    )
  }
}

test('render test', () => {
  expect(render(<CountComponent test={1}/>).find('.foo').text()).toEqual('1')
})

@flow((state, props) => {
  return {
    counter: state.arr[0].foobar,
  }
}, (state, props) => {
  return {
    test: state.test
  }
}, store)
class CountComponent1 extends Component {
  render () {
    return (
      <div>
        <p className={'bar'}>{Object.keys(this.props.counter)}</p>
        <p className={'test'}>{this.props.test}</p>
      </div>
    )
  }
}

test('render test', () => {
  expect(render(<CountComponent1/>).find('.bar').text()).toEqual('test')
  store.testAdd()
  expect(render(<CountComponent1/>).find('.test').text()).toEqual('2')
})

class Parent extends Component {
  render () {
    return <Provider store={store}>
      <CountComponent2/>
    </Provider>
  }
}

const CountComponent2 = connect(class extends Component {
  render () {
    return (
      <div>
        <p className={'bar'}>{Object.keys(this.props.store.test)}</p>
      </div>
    )
  }
})

test('render test', () => {
  expect(shallow(<Parent/>).contains(<CountComponent2/>)).toEqual(true)
})
