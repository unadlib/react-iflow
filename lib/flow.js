import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import flowAdvanced from './flowAdvanced'
import match from './match'
import proxy from '../utils/proxy'
import uniq from '../utils/uniq'

/* global toString */

export default (...params) => {
  return (TargetComponent) => {
    // TODO extends TargetComponent?
    class Species extends Component {
      static WrappedComponent = TargetComponent
      static contextTypes = {
        store: PropTypes.object,
      }

      constructor (...args) {
        super(...args)
        this._getterPaths = new Set()
        const {store, selector} = flowAdvanced.call(this, params, args[1])
        this._store = store
        this._selector = selector
        this.store = proxy.call(this, this._store)
        this._observer = (...args) => {
          const updatePath = args.slice(1, -2)
          this._update(updatePath)
        }
        this.store['__pipe__'].on(this._observer)
        this._merged = this._getMergedProps()
        this._update = (updatePath) => {
          // TODO improvement isUpdate for JSON/Array/Object etc.
          const paths = Array.from(this._getterPaths)
          const isUpdate = match({isUpdate: false}, updatePath, paths)
          if (isUpdate) {
            this._getterPaths = new Set()
            this._merged = this._getMergedProps()
            if (this._isStatelessComponent) {
              this.forceUpdate()
            } else {
              this._targetComponent.forceUpdate()
            }
          } else {
            // TODO remove uniq and handle action getter
            this._getterPaths = uniq(this._getterPaths)
          }
        }
      }

      _getMergedProps () {
        return this._selector ? this._selector() : {
          ...this.props,
          store: this.store,
          ...this._isStatelessComponent ? {} : { ref: (ref) => this._targetComponent = ref }
        }
      }

      get _isStatelessComponent() {
        return (
          typeof TargetComponent === "function" &&
          (!TargetComponent.prototype || !TargetComponent.prototype.render) &&
          !TargetComponent.isReactClass &&
          !Component.isPrototypeOf(TargetComponent)
        )
      }

      componentWillUnmount () {
        this.store['__pipe__'].off(this._observer)
      }

      render () {
        return React.createElement(TargetComponent, this._merged)
      }
    }

    // TODO store children : <Store><Component></Store> ?
    // TODO handle hoist-non-react-statics?
    return Species
  }
}
