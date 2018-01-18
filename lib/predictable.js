import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { predict } from 'iflow'
import { isStatelessComponent } from '../utils/tools'

export default function predictable (TargetComponent) {
  class PredictableComponent extends Component {
    static WrappedComponent = TargetComponent
    static displayName = TargetComponent.displayName
    _isStatelessComponent = isStatelessComponent(TargetComponent)

    render () {
      const predictableProps = Object.entries(this.props).reduce((props, [key, value]) => {
        if (value !== null && typeof value === 'object' && value['__pipe__']) {
          props[key] = predict(value)
        }
        return props
      }, {})
      return createElement(TargetComponent, {
        ...this.props,
        ...predictableProps,
        ...this._isStatelessComponent ? {} : {ref: (ref) => this.wrappedInstance = ref}
      })
    }
  }

  return hoistStatics(PredictableComponent, TargetComponent)
}