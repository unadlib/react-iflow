import React, { Component, Children, createElement } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import flowAdvanced from './flowAdvanced'
import match from './match'
import proxy from '../utils/proxy'
import warning from '../utils/warning'
import { isStatelessComponent } from '../utils/tools'

/* global toString */

export default (...params) => {
  return (TargetComponent) => {
    class Species extends Component {
      static WrappedComponent = TargetComponent
      static displayName = TargetComponent.displayName
      static contextTypes = {
        store: PropTypes.object,
      }

      constructor (...args) {
        super(...args)
        this._getterPaths = Object.create(null)
        const {store, selector} = flowAdvanced.call(this, params, args[1])
        if (!store || !store['__pipe__']) {
          throw new Error(warning.ConnectError)
        }
        this._store = store
        this._selector = selector
        this.store = proxy.call(this, this._store)
        this._observer = (...args) => {
          let updatePath = args.slice(1, -2)
          if (updatePath.includes('__parentPipe__')) {
            updatePath = updatePath.filter(
              (item, index) => ![item, updatePath[index - 1]].includes('__parentPipe__')
            )
          }
          const {mode} = args.slice(-1)[0]
          this._update(updatePath, mode)
        }
        this.store['__pipe__'].addObserver(this._observer)
        this._merged = this._getMergedProps()
        this._update = (updatePath, mode) => {
          // TODO improvement isUpdate for JSON/Array/Object etc.
          if (mode === 'batch') updatePath = updatePath.filter(i => i !== null)
          const isUpdate = match(updatePath, this._getterPaths, this.store)
          if (isUpdate) {
            this._getterPaths = {}
            this._merged = this._getMergedProps()
            if (this._isStatelessComponent) {
              this.forceUpdate()
            } else {
              try {
                this.forceUpdate()
              } catch (e) {
                this.wrappedInstance.forceUpdate()
              }
            }
          }
        }
        this._isStatelessComponent = isStatelessComponent(TargetComponent)
      }

      _getMergedProps () {
        return this._selector ? this._selector() : {
          ...this.props,
          store: this.store,
          ...this._isStatelessComponent ? {} : {ref: (ref) => this.wrappedInstance = ref}
        }
      }

      componentWillUnmount () {
        this.store['__pipe__'].off(this._observer)
      }

      render () {
        return createElement(TargetComponent, this._merged)
      }
    }

    // TODO store children : <Store><Component></Store> ?
    return hoistStatics(Species, TargetComponent)
  }
}
