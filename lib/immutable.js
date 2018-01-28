import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { getImmutable } from 'iflow'
import { isStatelessComponent } from '../utils/tools'

export default function immutable (TargetComponent) {
  class ImmutableComponent extends Component {
    static WrappedComponent = TargetComponent
    static displayName = TargetComponent.displayName
    _isStatelessComponent = isStatelessComponent(TargetComponent)

    render () {
      const immutableProps = Object.entries(this.props).reduce((props, [key, value]) => {
        if (value !== null && typeof value === 'object' && value['__pipe__']) {
          props[key] = getImmutable(value)
        }
        return props
      }, {})
      return createElement(TargetComponent, {
        ...this.props,
        ...immutableProps,
        ...this._isStatelessComponent ? {} : {ref: (ref) => this.wrappedInstance = ref}
      })
    }
  }

  return hoistStatics(ImmutableComponent, TargetComponent)
}

