import React, { Component, Children } from 'react'
import proxy from '../utils/proxy'
import uniq from '../utils/uniq'

/* global toString */

export default (selector) => {
  // TODO selector
  return (TargetComponent) => {
    class Species extends Component {
      static WrappedComponent = TargetComponent

      constructor (...args) {
        super(...args)
        this._getterPaths = new Set()
        this.store = proxy.call(this, this.props.store)
        this._observer = (...args) => {
          const updatePath = args.slice(1, -2)
          this._update(updatePath)
        }
        this.props.store.__pipe__.on(this._observer)
        this._update = (updatePath) => {
          // TODO improvement isUpdate for JSON/Array/Object etc.
          let isUpdate = false
          const paths = Array.from(this._getterPaths)
          for (let index = 0; index < paths.length; index++) {
            let path = paths[index]
            let length
            let subLength
            for (let key = 0; key < updatePath.length; key++) {
              const name = updatePath[key]
              length = Object.keys(path).length
              if (path[name]) {
                subLength = Object.keys(path[name]).length
                const isSubNodeEnd = Object.keys(path[name]).length === 0
                if (isSubNodeEnd) {
                  isUpdate = true
                } else {
                  path = path[name]
                }
              } else {
                const isParentNodeEnd = length === 0
                if (isParentNodeEnd) {
                  isUpdate = true
                }
                break
              }
              if (isUpdate) break
            }
            if (isUpdate) break
          }
          if (isUpdate) {
            this._getterPaths = new Set()
            this.forceUpdate()
          } else {
            // TODO remove uniq and handle action getter
            this._getterPaths = uniq(this._getterPaths)
          }
        }

      }

      componentWillUnmount () {
        this.prpops.store.__pipe__.off(this._observer)
      }

      render () {
        const props = {
          ...this.props,
          store: this.store,
        }
        return <TargetComponent {...props}/>
      }
    }

    return Species
  }
}